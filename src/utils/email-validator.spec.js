const Validator = require('validator')

class EmailValidator {
  isValid (email) {
    return Validator.isEmail(email)
  }
}

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should return true if email is valid.', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator return false', () => {
    Validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('invalidEmail@mail.com')
    expect(isEmailValid).toBe(false)
  })

  test('should return correct email', () => {
    const sut = makeSut()
    sut.isValid('email@email.com')
    expect(Validator.email).toEqual('email@email.com')
  })
})
