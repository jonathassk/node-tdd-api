module.exports = class LoadUserByEmailRepo {
  constructor (UserModel) {
    this.userModel = UserModel
  }

  async load (email) {
    const user = await this.userModel.findOne({ email }, {
      projection: {
        password: 'password'
      }
    })
    return user
  }
}
