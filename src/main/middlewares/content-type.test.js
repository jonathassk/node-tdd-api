const request = require('supertest')
const app = require('../config/app')

describe('content-type', () => {
  test('should return json as content-type as default', async () => {
    app.get('/content', (req, res) => {
      res.send('')
    })

    await request(app)
      .get('/content')
      .expect('content-type', /json/)
  })

  test('should return xml as content-type if forced', async () => {
    app.get('/xml', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .get('/xml')
      .expect('content-type', /xml/)
  })
})
