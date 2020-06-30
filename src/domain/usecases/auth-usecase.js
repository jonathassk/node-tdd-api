const { MissingParamError } = require('../../presentation/errors/index')

module.exports = class AuthUseCase {
  constructor ({ loadUserByEmailRepository, updateAccessTokenRepository, encrypter, tokenGenerator } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.updateAccessTokenRepository = updateAccessTokenRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('Email')
    }
    if (!password) {
      throw new MissingParamError('Password')
    }
    const user = await this.loadUserByEmailRepository.load(email)
    const isValid = user && await this.encrypter.compare(password, user.password)
    if (isValid) {
      const accessToken = await this.tokenGenerator.generate(user._id)
      await this.updateAccessTokenRepository.update(user._id, accessToken)
      return accessToken
    }
    return null
  }
}
