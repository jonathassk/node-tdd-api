const { MissingParamError } = require('../../presentation/errors/index')
const AuthUseCase = require('./auth-usecase')

const makeEncrypter = () => {
  class EncrypterSpy {
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
      return this.isValid
    }
  }
  const encrypterSpy = new EncrypterSpy()
  encrypterSpy.isValid = true
  return encrypterSpy
}

const makeTokenGeneratorSpy = () => {
  class TokenGeneratorSpy {
    async generate (userId) {
      this.userId = userId
      return this.accessToken
    }
  }
  const tokenGeneratorSpy = new TokenGeneratorSpy()
  tokenGeneratorSpy.accessToken = 'token'
  return tokenGeneratorSpy
}

const makeUpdateAccessTokenRepositorySpy = () => {
  class UpdateAccessTokenRepositorySpy {
    async update (userId, accessToken) {
      this.userId = userId
      this.accessToken = accessToken
    }
  }
  return new UpdateAccessTokenRepositorySpy()
}

const makeLoadUserByEmailRepositorySpy = () => {
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {
    password: 'hashedPassword',
    id: 'id'
  }
  return loadUserByEmailRepositorySpy
}

const makeSut = () => {
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepositorySpy()
  const encrypterSpy = makeEncrypter()
  const tokenGeneratorSpy = makeTokenGeneratorSpy()
  const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepositorySpy()
  const sut = new AuthUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    encrypter: encrypterSpy,
    tokenGenerator: tokenGeneratorSpy,
    updateAccessTokenRepository: updateAccessTokenRepositorySpy
  })
  return { sut, loadUserByEmailRepositorySpy, encrypterSpy, tokenGeneratorSpy, updateAccessTokenRepositorySpy }
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

  test('Should throw if invalids dependencies are provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('email@email.com', 'password')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({ loadUserByEmailRepository: {} })
    const promise = sut.auth('email@email.com', 'password')
    expect(promise).rejects.toThrow()
  })

  test('Should return null if invalid email is provided.', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalidEmail@email.com', 'password')
    expect(accessToken).toBeNull()
  })

  test('Should return null if invalid password is provided.', async () => {
    const { sut, encrypterSpy } = makeSut()
    encrypterSpy.isValid = false
    const accessToken = await sut.auth('email@email.com', 'invalid_password')
    expect(accessToken).toBeNull()
  })

  test('Should call encrypter with correct password', async () => {
    const { sut, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut()
    await sut.auth('email@email.com', 'password')
    expect(encrypterSpy.password).toBe('password')
    expect(encrypterSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password)
  })

  test('Should call tokenGenerator with correct userId if email and password are valid', async () => {
    const { sut, loadUserByEmailRepositorySpy, tokenGeneratorSpy } = makeSut()
    await sut.auth('email@email.com', 'password')
    expect(tokenGeneratorSpy.userId).toBe(loadUserByEmailRepositorySpy.user.id)
  })

  test('Should return a token if email and password are valids', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()
    const accessToken = await sut.auth('email@email.com', 'password')
    expect(accessToken).toBe(tokenGeneratorSpy.accessToken)
    expect(accessToken).toBeTruthy()
  })

  test('Should call UpdateAccessTokenRepository with correct Values', async () => {
    const { sut, loadUserByEmailRepositorySpy, updateAccessTokenRepositorySpy, tokenGeneratorSpy } = makeSut()
    await sut.auth('email@email.com', 'password')
    expect(updateAccessTokenRepositorySpy.userId).toBe(loadUserByEmailRepositorySpy.user.id)
    expect(updateAccessTokenRepositorySpy.accessToken).toBe(tokenGeneratorSpy.accessToken)
  })
})
