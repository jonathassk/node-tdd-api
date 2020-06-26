const { MissingParamError } = require('../../presentation/errors/index')
const mongoHelper = require('../../infra/helpsers/mongo-helper')

module.exports = class LoadUserByEmailRepo {
  async load (email) {
    if (!email) {
      return new MissingParamError('email')
    }
    const db = await mongoHelper.getDb()
    const user = await db.collection('users').findOne({ email }, {
      projection: {
        password: 'password'
      }
    })
    return user
  }
}
