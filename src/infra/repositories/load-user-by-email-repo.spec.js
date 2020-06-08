const { MongoClient } = require('mongodb')
let client, db

class LoadUserByEmailRepo {
  constructor (UserModel) {
    this.userModel = UserModel
  }

  async load (email) {
    const user = await this.userModel.findOne({ email })
    return user
  }
}

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
    await userModel.insertOne({
      email: 'validEmail@mail.com',
      name: 'user'
    })
    const user = await Sut.load('validEmail@mail.com')
    expect(user.email).toBe('validEmail@mail.com')
    expect(user.name).toBe('user')
  })
})
