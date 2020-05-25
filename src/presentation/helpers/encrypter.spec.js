const bcrypt = require('bcrypt')
const Encrypter = require('./encrypter')
const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('value', 'hash')
    expect(isValid).toBe(true)
  })

  test('Should return true if bcrypt returns true', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('value', 'hash')
    expect(isValid).toBe(false)
  })

  test('bcrypt should recieve correct values', async () => {
    const sut = makeSut()
    await sut.compare('value', 'hash')
    expect(bcrypt.value).toBe('value')
    expect(bcrypt.hash).toBe('hash')
  })
})
