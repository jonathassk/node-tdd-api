class TokenGenerator {
  async Generate (id) {
    return null
  }
}

describe('token generator', () => {
  test('Should return null if JWT returns null.', async () => {
    const sut = new TokenGenerator()
    const token = await sut.Generate('id')
    expect(token).toBeNull()
  })
})
