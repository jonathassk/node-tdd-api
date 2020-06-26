const loginRouter = require('../../../main/composers/login-router-composer')

module.exports = router => {
  router.post('/login', loginRouter)
}
