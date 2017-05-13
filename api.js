var fs = require('fs')
var path = require('path')

var _ = require('lodash')
var Router = require('express').Router

function readDB() { return JSON.parse(fs.readFileSync(path.join(__dirname, 'branches.json'))) }
var db = readDB()

var router = module.exports = Router()

router.route('/api/branches')
  .get(function(req, res) {
    if (Math.random() * 100 < 10) {
      return res.status(500).json({details: 'Randomly generated error for testing'})
    }

    const branches = _.chain(db).value()
    setTimeout(function() {
      res.status(200).json(branches)
    }, Math.random() * 800)
  })