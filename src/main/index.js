const App = require('./config/app')
const mongoHelper = require('../infra/helpsers/mongo-helper')
const env = require('../main/config/env')

mongoHelper.connect(env.mongoUrl)
  .then(() => {
    App.listen(3000, () => {
      console.log('server running!')
    })
  })
  .catch(console.error)
