const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const path = require('path')
const xlsx = require('node-xlsx')
require('dotenv').config()

const geoLocation = require('./utils/geoLocation')
const dateParser = require('./utils/dateParser')
const report = ('./models/report')
const filePath = path.join(__dirname, `/reports/${process.argv[2]}`)
const force = process.argv[2].substr(0, process.argv[2].indexOf('.'))

MongoClient.connect(process.env.DB_URL, (err, client) => {
  if (err) {
    console.log('Error connecting to database:', err)
  }
  const db = client.db('police_reports')

  const workSheetsFromFile = xlsx.parse(filePath)
  const [header, ...reports] = workSheetsFromFile[0].data
    .filter(e => e[0] != 'TA')
    .filter(e => e[0] != 'LW')
    .map(e => ({
      'force': force,
      'code': e[0],
      'description': e[4],
      'address': e[5].slice(4, e[5].length),
      'dateTime': dateParser(e[6]),
      'race': e[11],
      'officer': e[8],
    }))

    const promises = reports.map(async (report) => {
      const latLng = await geoLocation(report.address)
      return ({ ...report, latLng })
    })

    Promise.all(promises).then(reports => {
      db.collection('reports').insertMany(reports)
        .then(res => client.close())
        .catch(err => {
          console.log('Error uploading reports: ', err)
          client.close()
        })
    })
})
