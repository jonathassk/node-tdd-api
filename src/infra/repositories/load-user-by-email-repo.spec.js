const MongoHelper = require('../helpsers/mongo-helper')
const LoadUserByEmailRepo = require('./load-user-by-email-repository')
let userModel

const makeSut = () => {
  return new LoadUserByEmailRepo()
}

describe('loadUserByEmail', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if user is not found', async () => {
    const Sut = makeSut()
    const user = await Sut.load('invalidEmail@mail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found.', async () => {
    const Sut = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'validEmail@mail.com',
      name: 'user',
      age: 20,
      password: 'hashed_password'
    })
    const user = await Sut.load('validEmail@mail.com')
    expect(user).toEqual({
      _id: fakeUser.ops[0]._id,
      password: fakeUser.ops[0].password
    })
  })
})
