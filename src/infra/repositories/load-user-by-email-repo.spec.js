const { MongoClient } = require('mongodb')

class LoadUserByEmailRepo {
  constructor (UserModel) {
    this.userModel = UserModel
  }

  async load (email) {
    const user = await this.userModel.findOne({ email })
    return user
  }
}

const makeSut = (UserModel) => {
  return new LoadUserByEmailRepo(UserModel)
}

describe('loadUserByEmail', () => {
  let client, db
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
    const UserModel = await db.collection('users')
    const Sut = makeSut(UserModel)
    const user = await Sut.load('invalidEmail@mail.com')
    expect(user).toBeNull()
  })

  test('Should return ', async () => {
    const UserModel = await db.collection('users')
    await UserModel.insertOne({
      email: 'validEmail@mail.com',
      name: 'user'
    })
    const Sut = makeSut(UserModel)
    const user = await Sut.load('validEmail@mail.com')
    expect(user.email).toBe('validEmail@mail.com')
    expect(user.name).toBe('user')
  })
})
