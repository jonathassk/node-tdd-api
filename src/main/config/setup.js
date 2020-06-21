const cors = require('../middlewares/cors')
const express = require('express')

module.exports = App => {
  App.disable('x-powered-by')
  App.use(cors)
  App.use(express.json())
}
