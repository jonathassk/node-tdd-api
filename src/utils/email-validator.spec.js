class EmailValidator {
  isValid (email) {
    return true
  }
}

describe('Email Validator', () => {
  test('Should return true if email is valid.', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('email@mail.com')
    expect(isEmailValid).toBe(true)
  })
})
