const { MissingParamError } = require('../../presentation/errors/index')

class AuthUseCase {
  async Auth (email) {
    if (!email) {
      throw new MissingParamError('Email')
    }
  }
}

describe('Auth useCase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.Auth()
    expect(promise).rejects.toThrow(new MissingParamError('Email'))
  })
})
