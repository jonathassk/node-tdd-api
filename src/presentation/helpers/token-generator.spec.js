const jwt = require('jsonwebtoken')
const { MissingParamError } = require('../errors/index')
class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  async Generate (id) {
    if (!this.secret) {
      throw new MissingParamError('secret')
    }
    if (!id) {
      throw new MissingParamError('id')
    }
    return jwt.sign(id, this.secret)
  }
}

const makeSut = () => {
  return new TokenGenerator('secret')
}

describe('token generator', () => {
  test('Should return null if JWT returns null.', async () => {
    const sut = makeSut()
    jwt.token = null
    const token = await sut.Generate('id')
    expect(token).toBeNull()
  })

  test('Should return a token if JWT returns token.', async () => {
    const sut = makeSut()
    const token = await sut.Generate('id')
    expect(token).toBe(jwt.token)
  })

  test('Should call JWT with correct values.', async () => {
    const sut = makeSut()
    await sut.Generate('id')
    expect(jwt.id).toBe('id')
    expect(jwt.secret).toBe(sut.secret)
  })

  test('Should throw if no id are provided.', async () => {
    const sut = makeSut()
    const promise = sut.Generate('')
    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })

  test('Should throw if no secret are provided.', async () => {
    const sut = new TokenGenerator()
    const promise = sut.Generate('id')
    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })
})
