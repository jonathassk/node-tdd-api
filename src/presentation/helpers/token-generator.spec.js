const jwt = require('jsonwebtoken')

class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  async Generate (id) {
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
})
