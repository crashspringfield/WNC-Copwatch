import gql from 'graphql-tag'

/**
 * APD Daily Bulletins
 */
export const getBulletins = gql`
  query apd_bulletins($after: String, $before: String) {
    apd_bulletins(after: $after, before: $before) {
      id
      date
      geometry {
        lat
        lng
      }
    }
  }
`

export const getBulletinDetails = gql`
  query apd_bulletin($id: Int!) {
    apd_bulletin(id: $id) {
      date
      key
      force
      address
      lastName
      firstInitial
      middleInitial
      description
      race
      sex
    }
  }
`

export const getTargettedBulletins = gql`
  query targetedAPDBulletins($target: String) {
    targetedAPDBulletins(target: $target) {
      date
      geometry {
        lat
        lng
      }
    }
  }
`


/**
 * Traffic Stops
 */
export const getdailyTrafficStopStats = gql`
  {
    dailyTrafficStopStats {
      date
      stops

      arrests
      driver_arrested
      passenger_arrested

      searches
      driver_searched
      passenger_searched
      no_contraband_found
      personal_effects_searched
      search_initiated
      vehicle_searched
    }
  }
`

export const getAllTrafficStopStats = gql`
  {
    allTrafficStopStats {
      key
      value
    }
  }
`

export const getStops = gql`
  query trafficStops($after: String, $before: String) {
    trafficStops(after: $after, before: $before) {
      id
      date
      geometry {
        lat
        lng
      }
    }
  }
`

export const getStopDetails = gql`
  query trafficStop($id: Int!) {
    trafficStop(id: $id) {
      address
      agency
      reason
      off_use_force
      off_phys_resis
      driver_arrested
      passenger_arrested
      driver_searched
      passenger_searched
      no_contraband_found
      personal_effects_searched
      search_initiated
      vehicle_searched
      t_search_consent
      t_search_warrant
      t_probable_cause
      search_category
    }
  }
`
