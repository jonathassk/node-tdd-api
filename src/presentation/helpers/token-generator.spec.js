const jwt = require('jsonwebtoken')

class TokenGenerator {
  async Generate (id) {
    return jwt.sign(id, 'secret')
  }
}

const makeSut = () => {
  return new TokenGenerator()
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
})
