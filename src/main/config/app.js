const express = require('express')
const App = express()
const SetupApp = require('./setup')
const Routes = require('./routes')

SetupApp(App)
Routes(App)

module.exports = App
