const Validator = require('validator')

class EmailValidator {
  isValid (email) {
    return Validator.isEmail(email)
  }
}

describe('Email Validator', () => {
  test('Should return true if email is valid.', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator return false', () => {
    Validator.isEmailValid = false
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('invalidEmail@mail.com')
    expect(isEmailValid).toBe(false)
  })
})
