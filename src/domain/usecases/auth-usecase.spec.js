const { MissingParamError } = require('../../presentation/errors/index')
const AuthUseCase = require('./auth-usecase')

const makeSut = () => {
  class EncrypterSpy {
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
    }
  }

  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }
  const encrypterSpy = new EncrypterSpy()
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {
    password: 'hashedPassword'
  }
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy, encrypterSpy)
  return { sut, loadUserByEmailRepositorySpy, encrypterSpy }
}

describe('Auth useCase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('Email'))
  })

  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('email@email.com')
    expect(promise).rejects.toThrow(new MissingParamError('Password'))
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('email@email.com', 'password')
    expect(loadUserByEmailRepositorySpy.email).toBe('email@email.com')
  })

  test('Should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('email@email.com', 'password')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth('email@email.com', 'password')
    expect(promise).rejects.toThrow()
  })

  test('Should return null if invalid email is provided.', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalidEmail@email.com', 'password')
    expect(accessToken).toBeNull()
  })

  test('Should return null if invalid email is provided.', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('email@email.com', 'invalid_password')
    expect(accessToken).toBeNull()
  })

  test('Should call encrypter with correct password', async () => {
    const { sut, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut()
    await sut.auth('email@email.com', 'password')
    expect(encrypterSpy.password).toBe('password')
    expect(encrypterSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password)
  })
})
