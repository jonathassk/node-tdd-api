const { MissingParamError } = require('../../presentation/errors/index')
const MongoHelper = require('../../infra/helpsers/mongo-helper')

module.exports = class LoadUserByEmailRepo {
  async load (email) {
    if (!email) {
      return new MissingParamError('email')
    }
    const userModel = await MongoHelper.getCollection('users')
    const user = await userModel.findOne({ email }, {
      projection: {
        password: 'password'
      }
    })
    return user
  }
}
