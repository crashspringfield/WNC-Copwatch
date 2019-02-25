import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    incidents(
      before: String
      after: String
      description: String
    ): [Incident!]!
  }

  type Incident {
    id: Int
    date: Date

    force: String
    agency: String
    geo_beat: String
    geo_report_area: String
    geometry: LatLng

    offense_short_description: String
    offense_long_description: String
    offense_code: String
    offense_group_code: String
    offense_group_level: String
  }
`
