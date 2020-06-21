const cors = require('../middlewares/cors')
const express = require('express')
const contentType = require('../middlewares/content-type')

module.exports = App => {
  App.disable('x-powered-by')
  App.use(cors)
  App.use(express.json())
  App.use(contentType)
}
