/*
 * JSON Array of various examples of returned data. Figured it was easier to
 * update maintain than writing this in HTML for `./pages/Documentation.vue`.
 */

module.exports = {
  traffic_stops: [
    {
      title: 'All Open Data Traffic Stop Reports',
      description: "Returns all open data traffic stop reports since October 2017",
      url: '/api/v1/open-data/traffic-stops',
      parameters: [],
      example: 'http://copwatch.avlcommunityaction.com/api/v1/open-data/traffic-stops',
      result: `
      {
        'force': 'APD_open',
        'code': 'TC',
        'address': '700-BLK HENDERSONVILLE RD',
        'dateTime': '2017-10-01T00:00:00.000Z',
        'latLng': {
            'lat': 35.54585783101094,
            'lng': -82.53175793170404
          },
        'driver_searched': '0',
        'driver_arrested': '0',
        'no_contraband_found': '0',
        'off_phys_resis': '0',
        'off_use_force': '0',
        'passenger_arrested': '0',
        'passenger_searched': '0',
        'personal_effects_searched': '0',
        'search_initiated': '0',
        't_inc_arrest': '0',
        't_pro_frisk': '0',
        't_probable_cause': '0',
        't_search_consent': '0',
        't_search_warrant': '0',
        'traffic_stop_id': '128151',
        'vehicle_searched': '0'
      },
      ...
      `
    },
    {
      title: 'Traffic Stops - Searches',
      description: "Returns reports where driver, passenger, car, and/or property have been searched. This inclues both searches where consent has been given and reports where officer claimed 'reasonable suspicion'.",
      url: '/api/v1/open-data/traffic-stops/searches',
      parameters: [],
      example: 'http://copwatch.avlcommunityaction.com/api/v1/open-data/traffic-stops/searches',
      result: `
      {
        "force": "APD_open",
        "code": "TC",
        "address": "100-BLK BARTLETT ST",
        "dateTime": "2017-10-01T00:00:00.000Z",
        "latLng": {
          "lat": 35.582730271372135,
          "lng": -82.56033387249529
        },
        "driver_searched": "1",
        "driver_arrested": "0",
        "no_contraband_found": "0",
        "off_phys_resis": "0",
        "off_use_force": "0",
        "passenger_arrested": "1",
        "passenger_searched": "1",
        "personal_effects_searched": "0",
        "search_initiated": "0",
        "t_inc_arrest": "0",
        "t_pro_frisk": "1",
        "t_probable_cause": "0",
        "t_search_consent": "0",
        "t_search_warrant": "0",
        "traffic_stop_id": "128171",
        "vehicle_searched": "1"
      }, {
        "force": "APD_open",
        "code": "TC",
        "address": "1300-BLK PATTON AVE",
        "dateTime": "2017-10-02T00:00:00.000Z",
        "latLng": {
          "lat": 35.58367681813763,
          "lng": -82.60494310166803
        },
        "driver_searched": "0",
        "driver_arrested": "0",
        "no_contraband_found": "1",
        "off_phys_resis": "0",
        "off_use_force": "0",
        "passenger_arrested": "0",
        "passenger_searched": "0",
        "personal_effects_searched": "1",
        "search_initiated": "1",
        "t_inc_arrest": "0",
        "t_pro_frisk": "0",
        "t_probable_cause": "0",
        "t_search_consent": "1",
        "t_search_warrant": "0",
        "traffic_stop_id": "128182",
        "vehicle_searched": "0"
      },
      ...
      `
    },
    {
      title: 'Traffic Stops - Arrests',
      description: 'Returns reports where driver and/or passenger were arrested. Includes arrest from outstanding warrants and as a result of searches.',
      url: '/api/v1/open-data/traffic-stops/arrests',
      parameters: [],
      example: 'http://copwatch.avlcommunityaction.com/api/v1/open-data/traffic-stops/arrests',
      result: `
      {
        "force": "APD_open",
        "code": "TC",
        "address": "1000-BLK HENDERSONVILLE RD",
        "dateTime": "2017-10-01T00:00:00.000Z",
        "latLng": {
          "lat": 35.53515188780291,
          "lng": -82.52822178864606
        },
        "driver_searched": "0",
        "driver_arrested": "1",
        "no_contraband_found": "0",
        "off_phys_resis": "0",
        "off_use_force": "0",
        "passenger_arrested": "0",
        "passenger_searched": "0",
        "personal_effects_searched": "0",
        "search_initiated": "0",
        "t_inc_arrest": "0",
        "t_pro_frisk": "0",
        "t_probable_cause": "0",
        "t_search_consent": "0",
        "t_search_warrant": "0",
        "traffic_stop_id": "128176",
        "vehicle_searched": "0"
      }, {
        "force": "APD_open",
        "code": "TC",
        "address": "100-BLK ORA ST/RALPH ST",
        "dateTime": "2017-10-01T00:00:00.000Z",
        "latLng": {
          "lat": 35.57896646773841,
          "lng": -82.56056842536388
        },
        "driver_searched": "0",
        "driver_arrested": "1",
        "no_contraband_found": "0",
        "off_phys_resis": "0",
        "off_use_force": "0",
        "passenger_arrested": "0",
        "passenger_searched": "0",
        "personal_effects_searched": "0",
        "search_initiated": "0",
        "t_inc_arrest": "0",
        "t_pro_frisk": "0",
        "t_probable_cause": "0",
        "t_search_consent": "0",
        "t_search_warrant": "0",
        "traffic_stop_id": "128170",
        "vehicle_searched": "0"
      },
      ...
      `
    },
    {
      title: 'Traffic Stops - Use of Force',
      description: 'Returns reports where officer reported using force.',
      url: '/api/v1/open-data/traffic-stops/use-of-force',
      parameters: [],
      example: 'http://copwatch.avlcommunityaction.com/api/v1/open-data/traffic-stops/use-of-force',
      result: `
      {
        "force": "APD_open",
        "code": "TC",
        "address": "1000-BLK HENDERSONVILLE RD",
        "dateTime": "2017-10-01T00:00:00.000Z",
        "latLng": {
          "lat": 35.53515188780291,
          "lng": -82.52822178864606
        },
        "driver_searched": "0",
        "driver_arrested": "1",
        "no_contraband_found": "0",
        "off_phys_resis": "0",
        "off_use_force": "1",
        "passenger_arrested": "0",
        "passenger_searched": "0",
        "personal_effects_searched": "0",
        "search_initiated": "0",
        "t_inc_arrest": "0",
        "t_pro_frisk": "0",
        "t_probable_cause": "0",
        "t_search_consent": "0",
        "t_search_warrant": "0",
        "traffic_stop_id": "128176",
        "vehicle_searched": "0"
      }, {
        "force": "APD_open",
        "code": "TC",
        "address": "100-BLK ORA ST/RALPH ST",
        "dateTime": "2017-10-01T00:00:00.000Z",
        "latLng": {
          "lat": 35.57896646773841,
          "lng": -82.56056842536388
        },
        "driver_searched": "0",
        "driver_arrested": "1",
        "no_contraband_found": "0",
        "off_phys_resis": "0",
        "off_use_force": "1",
        "passenger_arrested": "0",
        "passenger_searched": "0",
        "personal_effects_searched": "0",
        "search_initiated": "0",
        "t_inc_arrest": "0",
        "t_pro_frisk": "0",
        "t_probable_cause": "0",
        "t_search_consent": "0",
        "t_search_warrant": "0",
        "traffic_stop_id": "128170",
        "vehicle_searched": "0"
      },
      ...
      `
    },
    {
      title: 'Daily Breakdown of Traffic Stops',
      description: 'Returns an array of daily totals for stops, arrests, and other subcategories',
      url: '/api/v1/open-data/traffic-stops/daily-breakdown',
      parameters: [],
      example: 'http://copwatch.avlcommunityaction.com/api/v1/open-data/traffic-stops/daily-breakdown',
      result: `
      {

          "date": "2017-10-01T00:00:00.000Z",
          "stops": 20,
          "searches": 1,
          "driver_searched": 1,
          "passenger_searched": 1,
          "personal_effects_searched": 0,
          "search_initiated": 0,
          "t_probable_cause": 0,
          "t_search_consent": 0,
          "t_search_warrant": 0,
          "vehicle_searched": 1,
          "arrests": 3,
          "driver_arrested": 2,
          "passenger_arrested": 1

      },
      {

          "date": "2017-10-02T00:00:00.000Z",
          "stops": 6,
          "searches": 2,
          "driver_searched": 1,
          "passenger_searched": 0,
          "personal_effects_searched": 1,
          "search_initiated": 2,
          "t_probable_cause": 1,
          "t_search_consent": 1,
          "t_search_warrant": 0,
          "vehicle_searched": 1,
          "arrests": 1,
          "driver_arrested": 1,
          "passenger_arrested": 0

      },
      `
    }, {

      title: 'Traffic Stop Statistics',
      description: 'Returns an object totalling stops, searches, arrests since October 2017. Also returns different search and arrest statistics.',
      url: '/api/v1/open-data/traffic-stops/statistics',
      parameters: [],
      example: 'http://copwatch.avlcommunityaction.com/api/v1/open-data/traffic-stops/statistics',
      result: `
      {

        "stops": 5660,
        "searches": 478,
        "arrests": 288,
        "seachWithConsent": 123,
        "searchWithProbableCause": 223,
        "searchWithWarrant": 0,
        "searchWithoutArrest": 238,
        "arrestWithoutSearch": 48,
        "searchWithoutConsentWarrantOrProbableCause": 78

      }
      `
    }
  ],
  incidents: [
    {
      title: 'All Incidents',
      description: 'Returns all open data incident reports since ???. This enpoint allows for query strings.',
      url: '/open-data/incidents',
      parameters: [
        'geo_beat'
      ],
      example: '',
      result: `

      `
    }
  ],
  complaints: [
    {
      title: 'All Complaints',
      description: "Returns all open data complaints against the APD as reported by the APD since ???. This enpoint allows for query strings. Dates for `before` and `after` are formatted YYYYMMDD. Other queries match against the provided fields. For an understanding of each field's possible values, make a request without any query string",
      url: '/open-data/complaints',
      parameters: [
        'after',
        'before',
        'allegation',
        'disposition',
        'status'
      ],
      example: '',
      result: `

      `
    }
  ],
  use_of_force: [
    {
      title: 'All Use of Force Reports',
      description: "Returns all open data reports in which APD documented using force since ???. This enpoint allows for query strings. Dates for `before` and `after` are formatted YYYYMMDD. Other queries match against the provided fields. For an understanding of each field's possible values, make a request without any query string",
      url: '/open-data/use-of-force',
      parameters: [
        'after',
        'before',
        'county_location',
        'disposition',
        'officer_condition_injury',
        'status',
        'subject_injury',
        'subject_race',
        'subject_resistence',
        'subject_sex',
        'type_force_used'
      ],
      example: 'http://localhost:3000/api/v1/open-data/use-of-force?before=20180202&type_force_used=taser',
      result: `
      [
        {
          "attributes": {
            "objectid": 3,
            "ia_no": "UOF2018-003",
            "subject_id": "subject_9612010",
            "incident_type": "Use of force",
            "county_location": "AC1",
            "occurred_date": "01/31/2018",
            "type_force_used": "Taser Deployment",
            "subject_resistence": "Aggressive Resistance",
            "officer_condition_injury": "",
            "subject_sex": "Male",
            "subject_race": "White",
            "disposition": "Within Policy",
            "status": "Completed",
            "subject_injury": "Treated at Hospital"
          }
        }
      ]

      `
    }
  ],
  bulletins: [
    {
      title: 'All Daily Bulletin Reports',
      description: "Returns all reports from APD's (and Buncombe County Sheriff's) daily bulletin reports. This allows for query strings with option parameters for officer name, arrest description, and race",
      url: '/api/v1/bulletin-reports',
      parameters: [ 'officer', 'description', 'race' ],
      example: 'http://copwatch.avlcommunityaction.com/api/v1/bulletin-reports?officer=~Craig&race=~white&description=~speed',
      result: `
      {
        "report_id": "",
        "force": "apd",
        "code": "TC",
        "description": " Cited on Charge of Speeding (18009147),",
        "address": "I 240/i240 E/ Exit 6, Asheville, ",
        "race": "White",
        "officer": "Craig, M R",
        "_id": "5b7df923aa4ccb2d189dcca8",
        "dateTime": "2018-04-12T04:00:00.000Z",
        "latLng": {
          "lat": 35.661734,
          "lng": -82.580595
        },
        "__v": 0
      }, {
        "report_id": "",
        "force": "apd",
        "code": "AR",
        "description": " Arrest on chrg of 1) Driving While Impaired (M) and 2) Speeding (T),",
        "address": "I-240 E/exit 7, Asheville, NC, ",
        "race": "White",
        "officer": "Craig, M R",
        "_id": "5b7df923aa4ccb2d189dcd2e",
        "dateTime": "2018-04-19T04:00:00.000Z",
        "latLng": {
          "lat": 35.4852968,
          "lng": -82.8649739
        },
        "__v": 0
      },
      ...
      `
    },
    {
      title: 'Daily Bulletin Reports - Arrest Description',
      description: "Returns reports from APD's daily bulletin where reason for arrest includes search term. (Note: many times specific words are abbreviated--e.g. 'mari' for 'marijuanna'--so results may be limited. Using the map can give you a feel for the different search terms to try.)",
      url: '/api/v1/bulletin-reports/description/:word',
      parameters: [ 'word' ],
      example: 'http://copwatch.avlcommunityaction.com/api/v1/bulletin-reports/description/para',
      result: `
      {
        "report_id": "",
        "force": "apd",
        "code": "AR",
        "description": " Arrest on chrg of 1) Simple Possess Sch Vi Cs (m) (M), 2) Possess Marij Paraphernalia (M), and 3) Misuse Of 911 System (M),",
        "address": "100-BLK Coxe Ave, Asheville, NC, ",
        "race": "Black",
        "officer": "Hernandez, E",
        "_id": "5b7df923aa4ccb2d189dca9c",
        "dateTime": "2018-04-01T04:00:00.000Z",
        "latLng": {
          "lat": 35.590796,
          "lng": -82.554851
        },
        "__v": 0
      }, {
        "report_id": "",
        "force": "sheriff",
        "code": "AR",
        "description": " Arrest on chrg of 1) Possess Methamphetamine (F) and 2) Possess Drug Paraphernalia (M),",
        "address": "2500-BLK Smokey Park Hwy, Candler, NC, ",
        "race": "White",
        "officer": "Warren, K V",
        "_id": "5b7df923aa4ccb2d189dcaa8",
        "dateTime": "2018-04-01T04:00:00.000Z",
        "latLng": {
          "lat": 35.541367,
          "lng": -82.7508835
        },
        "__v": 0
      },
      `
    },
    {
      title: 'Daily Bulletin Reports - Officer Name',
      description: 'Returns reports where officer last name matches parameter',
      url: '/api/v1/bulletin-reports/officer/:officer',
      parameters: [ 'officer' ],
      example: 'http://copwatch.avlcommunityaction.com/api/v1/bulletin-reports/officer/pig',
      result: `
      {
        "report_id": "",
        "force": "apd",
        "code": "TC",
        "description": " Cited on Charge of Fail To Wear Seat Belt-driver (18013979),",
        "address": "Hi Alta Ave/lakeside Dr, Asheville, ",
        "race": "White",
        "officer": "Pigman, M D",
        "_id": "5b7df923aa4ccb2d189dd21b",
        "dateTime": "2018-06-05T04:00:00.000Z",
        "latLng": {
          "lat": 35.5764099,
          "lng": -82.62594059999999
        },
        "__v": 0
      }, {
        "report_id": "",
        "force": "apd",
        "code": "TC",
        "description": " Cited on Charge of Dwlr Not Impaired Rev (18013993),",
        "address": "Nc 191/wells Ave, Asheville, ",
        "race": "White",
        "officer": "Pigman, M D",
        "_id": "5b7df923aa4ccb2d189dd21c",
        "dateTime": "2018-06-05T04:00:00.000Z",
        "latLng": {
          "lat": 35.5769853,
          "lng": -82.59313150000001
        },
        "__v": 0
      },
      `
    },
    {
      title: 'Daily Bulletin Reports - Date Range',
      description: 'Returns reports between start and end date. Dates are formatted YYYYMMDD.',
      url: '/api/v1/bulletin-reports/range/:start/:end',
      parameters: [ 'start', 'end' ],
      example: 'http://copwatch.avlcommunityaction.com/api/v1/bulletin-reports/range/20180725/20180727',
      result: `
      {
        "report_id": "",
        "force": "apd",
        "code": "AR",
        "description": " Arrest on chrg of 1) Simple Assault (M), 2) Injury To Personal Property (M), 3) Poss/con Beer/wine Unauth Prem (M), and 4) Poss/con Beer/wine Unauth Prem (M),",
        "address": "100-BLK N Ann St, Asheville, NC, ",
        "race": "White",
        "officer": "Crume, R D",
        "_id": "5b7df923aa4ccb2d189dd70f",
        "dateTime": "2018-07-25T04:00:00.000Z",
        "latLng": {
          "lat": 35.5952775,
          "lng": -82.5606153
        },
        "__v": 0
      }, {
        "report_id": "",
        "force": "apd",
        "code": "AR",
        "description": " Arrest on chrg of Misdemeanor Probation Viol (M),",
        "address": "100-BLK Asheland Ave, Asheville, NC, ",
        "race": "Asian / Pacific Islander/",
        "officer": "Woods, W M",
        "_id": "5b7df923aa4ccb2d189dd714",
        "dateTime": "2018-07-25T04:00:00.000Z",
        "latLng": {
          "lat": 35.58941290000001,
          "lng": -82.5559031
        },
        "__v": 0
      },
      `
    },
  ]
}
