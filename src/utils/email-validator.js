const Validator = require('validator')

class EmailValidator {
  isValid (email) {
    return Validator.isEmail(email)
  }
}

module.exports = EmailValidator
