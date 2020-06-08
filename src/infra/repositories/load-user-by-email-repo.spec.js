const MongoHelper = require('../helpsers/mongo-helper')
const LoadUserByEmailRepo = require('./load-user-by-email-repository')
let db

const makeSut = () => {
  const userModel = db.collection('users')
  const Sut = new LoadUserByEmailRepo(userModel)
  return { Sut, userModel }
}

describe('loadUserByEmail', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  test('Should return null if user is not found', async () => {
    const { Sut } = makeSut()
    const user = await Sut.load('invalidEmail@mail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found.', async () => {
    const { Sut, userModel } = makeSut()
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
