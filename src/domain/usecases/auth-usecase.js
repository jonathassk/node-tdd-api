const { MissingParamError } = require('../../presentation/errors/index')

module.exports = class AuthUseCase {
  constructor ({ loadUserByEmailRepository, encrypter, tokenGenerator, updateAccessTokenRepository } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('Email')
    }
    if (!password) {
      throw new MissingParamError('Password')
    }
    const user = await this.loadUserByEmailRepository.load(email)
    if (user && await this.encrypter.compare(password, user.password)) {
      const accessToken = await this.tokenGenerator.generate(user.id)
      await this.updateAccessTokenRepository.update(user.id, accessToken)
      return accessToken
    }
    return null
  }
}
