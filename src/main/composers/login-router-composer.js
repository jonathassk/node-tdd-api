const LoginRouter = require('../../presentation/routers/login-router')
const AuthUseCase = require('../../domain/usecases/auth-usecase')
const EmailValidator = require('../../utils/email-validator')
const LoadUserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository')
const UpdateAccessToken = require('../../infra/repositories/update-access-token')
const Encrypter = require('../../presentation/helpers/encrypter')
const TokenGenerator = require('../../presentation/helpers/token-generator')
const env = require('../../main/config/env')

module.exports = class loginRouterComposer {
  static composer () {
    const loadUserByEmailRepo = new LoadUserByEmailRepository()
    const tokenGenerator = new TokenGenerator(env.tokenSecret)
    const encrypter = new Encrypter()
    const updateAccessToken = new UpdateAccessToken()
    const emailValidator = new EmailValidator()
    const authUseCase = new AuthUseCase({ loadUserByEmailRepo, updateAccessToken, encrypter, tokenGenerator })
    return new LoginRouter({ authUseCase, emailValidator })
  }
}
