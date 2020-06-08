const { MongoClient } = require('mongodb')
const LoadUserByEmailRepo = require('./load-user-by-email-repository')
let client, db

const makeSut = () => {
  const userModel = db.collection('users')
  const Sut = new LoadUserByEmailRepo(userModel)
  return { Sut, userModel }
}

describe('loadUserByEmail', () => {
  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await client.db()
  })

  afterAll(async () => {
    await client.close()
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
