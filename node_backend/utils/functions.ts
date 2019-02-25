import {
  LatLng,
  OpenDataReport,
  Query,
  TrafficStop
} from '../entity'

/**
 * Functions shared across components
 */

// flatten :: [[]] -> []
const flatten = (arr: []): any => [].concat.apply([], arr)

// fixBool :: String | Number -> Bool
const fixBool = (b: (string | Number)): Boolean => (b == 0) ? false : true

// fixDate :: String -> Date
const fixDate = (yyyymmdd: String): Date => {
  const specific = yyyymmdd.length > 8

  const y = parseInt(yyyymmdd.substring(0, 4))
  const m = parseInt(yyyymmdd.substring(4, 6)) - 1
  const d = parseInt(yyyymmdd.substring(6, 8))

  const h = specific
    ? parseInt(yyyymmdd.substring(8, 10))
    : 0
  const min = specific
    ? parseInt(yyyymmdd.substring(10, 12))
    : 0
  const sec = specific
    ? parseInt(yyyymmdd.substring(12,))
    : 0

  return new Date(y, m, d, h, min, sec)
}

// dateFromQuery :: String -> Date
const dateFromQuery = (date: string): Date => new Date(date)

// tupleToObj :: [[]] -> LatLng
const tupleToObj = (arr: []): Array<LatLng> => arr.map((geo: Number[]) => {
  return {
    lat: geo[0],
    lng: geo[1]
  }
})


/**
 * Filters for Open Data
 */

// applyFilters :: [ Function ] -> [ OpenDataReport ] -> [ OpenDataReport ]
const applyFilters = (
  fns: Array<Function>,
  arr: Array<OpenDataReport>
): Array<OpenDataReport> => {
  return fns.reduce((acc: Array<OpenDataReport>, curr: Function) => curr(acc), arr)
}

// filterAfter :: Query -> [ OpenDataReport ] -> [ OpenDataReport ]
const filterAfter = (
  query: Query,
  arr: Array<OpenDataReport>
): Array<OpenDataReport> => arr.filter((r: OpenDataReport) => {
  if (query.after) {
    const occured = r.date
    const param = dateFromQuery(query.after.toString())
    return occured >= param
  }
  return true // apply filter only if part of query
})

// filterBefore :: Query -> [ OpenDataReport ] -> [ OpenDataReport ]
const filterBefore = (
  query: Query,
  arr: Array<OpenDataReport>
): Array<OpenDataReport> => arr.filter((r: OpenDataReport) => {
  if (query.before) {
    const occured = r.date
    const param = dateFromQuery(query.before.toString())
    return occured <= param
  }
  return true // apply filter only if part of query
})

// TODO: This was developed for a URL and can probably be implemented in a cleaner
// way depending on to what degree we update field names and make each queryable
// filterOne :: String -> Query -> [ OpenDataReport ] -> [ OpenDataReport ]
const filterOne = (
  type: string,
  query: any, // type Query won't work b/c how we access the value
  arr: Array<OpenDataReport>
): Array<OpenDataReport> => arr.filter((r: any) => {
  if (query[type]) {
    if (r[type]) {
      return r[type].toLowerCase().includes(query[type].toLowerCase())
    }
    return false // handle `null`
  }
  return true // apply filter only if part of query
})

// filterArrests :: Query -> [ TrafficStop ] -> [ TrafficStop ]
const filterArrests = (
  query: Query,
  arr: Array<TrafficStop>
): Array<TrafficStop> => arr.filter((report: TrafficStop) => {
  if (query.arrest === true) {
    return (
      report.driver_arrested ||
      report.passenger_arrested
    )
  }
  return true // apply filter only if part of query
})

// filterSearches :: Query -> [ TrafficStop ] -> [ TrafficStop ]
const filterSearches = (
  query: Query,
  arr: Array<TrafficStop>
): Array<TrafficStop> => arr.filter((report: TrafficStop) => {
  if (query.search === true) {
    return (
      report.driver_searched ||
      report.passenger_searched ||
      report.personal_effects_searched ||
      report.search_initiated ||
      report.vehicle_searched
    )
  }
  return true // apply filter only if part of query
})

// filterUseOfForce :: Query -> [ TrafficStop ] -> [ TrafficStop ]
const filterUseOfForce = (
  query: Query,
  arr: Array<TrafficStop>
): Array<TrafficStop> => arr.filter((report: TrafficStop) => {
  if (query.use_of_force === true) {
    return report.off_use_force
  }
  return true // apply filter only if part of query
})

export {
  // shared functions
  fixBool,
  fixDate,
  flatten,
  tupleToObj,

  // filters for Open Data reducers
  applyFilters,
  filterAfter,
  filterArrests,
  filterBefore,
  filterOne,
  filterSearches,
  filterUseOfForce,
}
