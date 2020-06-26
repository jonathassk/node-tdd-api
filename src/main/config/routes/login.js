const loginRouter = require('../../../main/composers/login-router-composer')
const expressRouterAdapter = require('../../adapters/express-route-adapter')

module.exports = router => {
  router.post('/login', expressRouterAdapter.adapt(loginRouter))
}
