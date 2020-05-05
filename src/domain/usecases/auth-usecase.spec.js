const { MissingParamError } = require('../../presentation/errors/index')

class AuthUseCase {
  constructor (loadUserByEmailRepositorySpy) {
    this.loadUserByEmailRepositorySpy = loadUserByEmailRepositorySpy
  }

  async Auth (email, password) {
    if (!email) {
      throw new MissingParamError('Email')
    }
    if (!password) {
      throw new MissingParamError('Password')
    }
    await this.loadUserByEmailRepositorySpy.load(email)
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

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    class LoadUserByEmailRepositorySpy {
      async load (email) {
        this.email = email
      }
    }
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
    const sut = new AuthUseCase(loadUserByEmailRepositorySpy)
    await sut.Auth('email@email.com', 'password')
    expect(loadUserByEmailRepositorySpy.email).toBe('email@email.com')
  })
})
