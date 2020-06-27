const LoginRouterComposer = require('../../../main/composers/login-router-composer')
const { adapt } = require('../../adapters/express-route-adapter')

module.exports = router => {
  router.post('/login', adapt(LoginRouterComposer.composer()))
}
