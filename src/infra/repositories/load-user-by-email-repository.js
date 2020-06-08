const { MissingParamError } = require('../../presentation/errors/index')

module.exports = class LoadUserByEmailRepo {
  constructor (UserModel) {
    this.userModel = UserModel
  }

  async load (email) {
    if (!email) {
      return new MissingParamError('email')
    }
    const user = await this.userModel.findOne({ email }, {
      projection: {
        password: 'password'
      }
    })
    return user
  }
}
