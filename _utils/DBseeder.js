/*
 * Seeds database with contents of backup
 * script `node DBseeder backup.json`
 */

const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const Report = require ('./models/report')
const winston = require('../config/winston')

const reports = process.argv[2]

mongoose.connect(process.env.DB_URL_LOCAL, (err, res) => {
  if (err) {
    winston.error(`DB CONNECTION FAILED: ${err}`)
  }
  reports.forEach(r => {
    const report = new Report({
      report_id: r.report_id,
      force: r.force,
      code: r.code,
      description: r.description,
      address: r.address,
      dateTime: new Date(r.dateTime),
      race: r.race,
      officer: r.officer,
      latLng: r.latLng
    })

    report.save((err) => {
      if (err) {
        winston.error(err)
      }
    })
  })
})
