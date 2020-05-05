const { MissingParamError } = require('../../presentation/errors/index')

class AuthUseCase {
  async Auth (email, password) {
    if (!email) {
      throw new MissingParamError('Email')
    }
    if (!password) {
      throw new MissingParamError('Password')
    }
  }
}

describe('Auth useCase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.Auth()
    expect(promise).rejects.toThrow(new MissingParamError('Email'))
  })

  test('Should throw if no password is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.Auth('email@email.com')
    expect(promise).rejects.toThrow(new MissingParamError('Password'))
  })
})
