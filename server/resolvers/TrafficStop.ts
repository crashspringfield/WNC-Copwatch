import { HttpService } from '../services'
import {
  DailyTrafficStats,
  Query,
  TrafficStop,
  UnformattedReport,
} from '../entity'
import {
  applyFilters,
  boolToInt,
  filterAfter,
  filterBefore,
  filterArrests,
  filterSearches,
  filterOne,
  fixBool,
  fixDate
} from '../utils/functions'

const APD_OPEN_DATA_URL = "https://services.arcgis.com/aJ16ENn1AaqdFlqx/arcgis/rest/services"
const apdOpenDataService = new HttpService(APD_OPEN_DATA_URL)

const formatTrafficStops = (stops: Array<UnformattedReport>): Array<TrafficStop> => {
  return stops.map((stop: UnformattedReport) => {
    // create field for given search reason
    let categories: [string?] = []

    if (stop.attributes.t_probable_cause == '1') {
      categories.push("Probable cause")
    }
    if (stop.attributes.t_search_consent == '1') {
      categories.push("Consented to search")
    }
    if (stop.attributes.t_search_warrant == '1') {
      categories.push("Search warrant")
    }

    const trafficStop: TrafficStop = {
      id: stop.attributes.objectid,

      address: stop.attributes.address || '',
      agency: stop.attributes.agency || '',
      date: fixDate(stop.attributes.date_occurred),
      geometry: {
        lat: stop.geometry ? stop.geometry.x : null,
        lng: stop.geometry ? stop.geometry.y : null
      },
      reason: stop.attributes.stop_sbi_desc || '',
      tsId: stop.attributes.traffic_stop_id || '',
      off_use_force: fixBool(stop.attributes.off_use_force),
      off_phys_resis: fixBool(stop.attributes.off_phys_resis),

      driver_arrested: fixBool(stop.attributes.driver_arrested),
      passenger_arrested: fixBool(stop.attributes.passenger_arrested),

      driver_searched: fixBool(stop.attributes.driver_searched),
      passenger_searched: fixBool(stop.attributes.passenger_searched),
      no_contraband_found: fixBool(stop.attributes.no_contraband_found),
      personal_effects_searched: fixBool(stop.attributes.personal_effects_searched),
      search_initiated: fixBool(stop.attributes.search_initiated),
      vehicle_searched: fixBool(stop.attributes.vehicle_searched),
      t_search_consent: fixBool(stop.attributes.t_search_consent),
      t_search_warrant: fixBool(stop.attributes.t_search_warrant),
      t_probable_cause: fixBool(stop.attributes.t_probable_cause),
      search_category: categories
    }

    return trafficStop
  })
}

const formatDailyStats = (stops: Array<TrafficStop>): Array<DailyTrafficStats> => {
  let dataset: any = []

  stops.forEach((stop: TrafficStop) => {
    const existingDates = dataset.map((d: DailyTrafficStats) => `${d.date.getMonth()}/${d.date.getDate()}${d.date.getFullYear()}`)
    const date = new Date(stop.date)

    // only count for one search or arrest
    let searches = (
      stop.driver_searched ||
      stop.passenger_searched ||
      stop.search_initiated ||
      stop.vehicle_searched ||
      stop.personal_effects_searched ||
      stop.t_search_consent ||
      stop.t_search_warrant  ||
      stop.t_probable_cause
    ) ? 1 : 0

    let arrests = (
      stop.driver_arrested  ||
      stop.passenger_arrested
    ) ? 1 : 0

    // update the previous object b/c it's from the same day
    if (existingDates.includes(`${date.getMonth()}/${date.getDate()}${date.getFullYear()}`)) {
      let sameDay = dataset[dataset.length - 1]
      const index = dataset.indexOf(sameDay)

      sameDay = {
        date: sameDay.date,
        stops: sameDay.stops + 1,

        searches: sameDay.searches + searches,
        driver_searched: sameDay.driver_searched + boolToInt(stop.driver_searched),
        passenger_searched: sameDay.passenger_searched + boolToInt(stop.passenger_searched),
        personal_effects_searched: sameDay.personal_effects_searched + boolToInt(stop.personal_effects_searched),
        search_initiated: sameDay.search_initiated + boolToInt(stop.search_initiated),
        t_probable_cause: sameDay.t_probable_cause + boolToInt(stop.t_probable_cause),
        t_search_consent: sameDay.t_search_consent + boolToInt(stop.t_search_consent),
        t_search_warrant: sameDay.t_search_warrant + boolToInt(stop.t_search_warrant),
        vehicle_searched: sameDay.vehicle_searched + boolToInt(stop.vehicle_searched),

        arrests: sameDay.arrests + arrests,
        driver_arrested: sameDay.driver_arrested + boolToInt(stop.driver_arrested),
        passenger_arrested: sameDay.passenger_arrested + boolToInt(stop.passenger_arrested)
      }

      // replace w/ updated version
      dataset[index] = sameDay
    } else {
      // create a new object
      dataset.push({
        date: date,
        stops: 1,

        searches: searches,
        driver_searched: boolToInt(stop.driver_searched),
        passenger_searched: boolToInt(stop.passenger_searched),
        personal_effects_searched: boolToInt(stop.personal_effects_searched),
        search_initiated: boolToInt(stop.search_initiated),
        t_probable_cause: boolToInt(stop.t_probable_cause),
        t_search_consent: boolToInt(stop.t_search_consent),
        t_search_warrant: boolToInt(stop.t_search_warrant),
        vehicle_searched: boolToInt(stop.vehicle_searched),

        arrests: arrests,
        driver_arrested: boolToInt(stop.driver_arrested),
        passenger_arrested: boolToInt(stop.passenger_arrested)
      })
    }
  })
  return dataset.sort((a: DailyTrafficStats, b: DailyTrafficStats) => a.date.getTime() - b.date.getTime())
}

const calculateStats = (stops: Array<DailyTrafficStats>) => {
  const accumulator = {
    stops: 0,
    searches: 0,
    arrests: 0,
    searchWithoutArrest: 0,
    arrestWithoutSearch: 0,
    seachWithConsent: 0,
    searchWithProbableCause: 0,
    searchWithWarrant: 0,
    searchWithoutConsentWarrantOrProbableCause: 0
  }

  return stops.reduce((acc: any, val: any) => {
    const searchWithoutArrest = (
      (val.searches >= 1 && val.arrests === 0) ||
      (val.searches > val.arrests)
    ) ? (val.searches - val.arrests) : 0
    const arrestWithoutSearch = (
      (val.searches === 0 && val.arrests >= 1) ||
      (val.searches < val.arrests)
    ) ? (val.arrests - val.searches) : 0
    const seachWithConsent = (
      val.t_search_consent >= 1
    ) ? val.t_search_consent : 0
    const searchWithProbableCause = (
      val.t_probable_cause >= 1
    ) ? val.t_probable_cause : 0
    const searchWithWarrant = (
      val.t_search_warrant >= 1
    ) ? val.t_search_warrant : 0
    const searchWithoutConsentWarrantOrProbableCause = (
      (val.searches >= 1 && val.t_search_consent === 0 && val.t_probable_cause === 0 && val.t_probable_cause === 0) ||
      (val.searches > (val.t_search_consent + val.t_probable_cause + val.t_probable_cause))
    ) ? (val.searches - val.t_search_consent - val.t_probable_cause - val.t_probable_cause) : 0

    return {
      stops: acc.stops += val.stops,
      searches: acc.searches += val.searches,
      arrests: acc.arrests += val.arrests,

      seachWithConsent: acc.seachWithConsent += seachWithConsent,
      searchWithProbableCause: acc.searchWithProbableCause += searchWithProbableCause,
      searchWithWarrant: acc.searchWithWarrant += searchWithWarrant,

      searchWithoutArrest: acc.searchWithoutArrest += searchWithoutArrest,
      arrestWithoutSearch: acc.arrestWithoutSearch += arrestWithoutSearch,
      searchWithoutConsentWarrantOrProbableCause: acc.searchWithoutConsentWarrantOrProbableCause += searchWithoutConsentWarrantOrProbableCause
    }
  }, accumulator)
}

export default {
  Query: {
    trafficStops: async (parent: any, args: Query, { client }: any) => {
      // try getting from redis
      const result =  JSON.parse( await client.getAsync('trafficStops'))

      if (result) {
        return result
      }

      // if not, call and cache
      const url: String = "APDTrafficStops/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
      const rawTrafficStops: Array<UnformattedReport> = await apdOpenDataService.get(url).then(data => data.features)
      const formattedTrafficStops: Array<TrafficStop> = formatTrafficStops(rawTrafficStops).slice(0,100)

      client.set('trafficStops', JSON.stringify(formattedTrafficStops))

      // partially apply filters
      const before = (stops: Array<TrafficStop>) => filterBefore(args, stops)
      const after = (stops: Array<TrafficStop>) => filterAfter(args, stops)
      const searches = (stops: Array<TrafficStop>) => filterSearches(args, stops)
      const arrests = (stops: Array<TrafficStop>) => filterArrests(args, stops)
      const reason = (stops: Array<TrafficStop>) => filterOne('reason', args, stops)

      // compose
      return applyFilters(
        [
          after,
          before,
          arrests,
          searches,
          reason,
        ],
        formattedTrafficStops
      )
    },

    trafficStop: async (parent: any, args: Query, context: any) => {
      // TODO
    },

    dailyTrafficStopStats: async (parent: any, args: Query, { client }: any) => {
      // try getting from redis
      const result =  JSON.parse( await client.getAsync('dailyTrafficStopStats'))

      if (result) {
        return result
      }

      // if not cached, call and calculate
      const url: String = "APDTrafficStops/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
      const rawTrafficStops: Array<UnformattedReport> = await apdOpenDataService.get(url).then(data => data.features)
      const formattedTrafficStops: Array<TrafficStop> = formatTrafficStops(rawTrafficStops)
      const dailyStats: Array<DailyTrafficStats> = formatDailyStats(formattedTrafficStops)

      // cache and return
      client.set('dailyTrafficStopStats', JSON.stringify(dailyStats))

      return dailyStats
    },

    allTrafficStopStats: async (parent: any, args: Query, { client }: any) => {
      // try getting from redis
      const result = await client.hgetallAsync('allTrafficStopStats')

      if (result) {
        return result
      }

      // if not cached, call and calculate
      const url: String = "APDTrafficStops/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
      const rawTrafficStops: Array<UnformattedReport> = await apdOpenDataService.get(url).then(data => data.features)
      const formattedTrafficStops: Array<TrafficStop> = formatTrafficStops(rawTrafficStops)
      const dailyStats: Array<DailyTrafficStats> = formatDailyStats(formattedTrafficStops)
      const allStats = calculateStats(dailyStats)

      // cache and return
      for (let key in allStats) {
        await client.hset('allTrafficStopStats', key, allStats[key])
      }

      return allStats
    },
  }
}
