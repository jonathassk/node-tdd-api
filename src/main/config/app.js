const express = require('express')
const App = express()
const SetupApp = require('./setup')

SetupApp(App)

module.exports = App
