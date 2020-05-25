const bcrypt = require('bcrypt')
const Encrypter = require('./encrypter')
const { MissingParamError } = require('../../presentation/errors/index')

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

  test('Bcrypt should recieve correct values', async () => {
    const sut = makeSut()
    await sut.compare('value', 'hash')
    expect(bcrypt.value).toBe('value')
    expect(bcrypt.hash).toBe('hash')
  })

  test('Should throw if values are not provided', async () => {
    const sut = makeSut()
    expect(sut.compare()).rejects.toThrow(new MissingParamError('value'))
  })

  test('Should throw if values are not provided', async () => {
    const sut = makeSut()
    expect(sut.compare('value')).rejects.toThrow(new MissingParamError('hash'))
  })

  test('Should throw if values are not provided', async () => {
    const sut = makeSut()
    expect(sut.compare('', 'hash')).rejects.toThrow(new MissingParamError('value'))
  })
})
