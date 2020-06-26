const App = require('./config/app')
const mongoHelper = require('../infra/helpsers/mongo-helper')
const env = require('../main/config/env')

mongoHelper.connect(env.mongoUrl)
  .then(() => {
    App.listen(env.port, () => {
      console.log(`server running at localhost: http://localhost:${env.port}`)
    })
  })
  .catch(console.error)
