const cors = require('../middlewares/cors')

module.exports = App => {
  App.disable('x-powered-by')
  App.use(cors)
}
