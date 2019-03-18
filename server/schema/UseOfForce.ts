import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    useOfForce(
      before: String
      after: String
      disposition: String
      status: String
      geo_beat: String
      officer_condition_injury: String
      subject_race: String
      subject_sex: String
      subject_injury: String
      subject_resistence: String
      type_force_used: String
    ): [UseOfForce]
  }

  type UseOfForce {
    id: Int
    date: Date

    ia_no: String
    subject_id: String
    incident_type: String
    geo_beat: String
    type_force_used: String
    disposition: String
    status: String

    officer_condition_injury: String
    subject_resistence: String
    subject_sex: String
    subject_race: String
    subject_injury: String
  }
`