const HttpResponse = require('../helpers/http-response')
const { MissingParamError, InvalidParamError } = require('../errors/index')
module.exports = class LoginRouter {
  constructor ({ authUseCase, emailValidator } = {}) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }
      const accessToken = this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      }
      return HttpResponse.worked({ accessToken })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
