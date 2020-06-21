const request = require('supertest')
const App = require('../config/app')

describe('Json parser middleware', () => {
  test('should parse body as JSON', async () => {
    App.post('/parser', (req, res) => {
      res.send(req.body)
    })

    await request(App)
      .post('/parser')
      .send({ name: 'jonathas' })
      .expect({ name: 'jonathas' })
  })
})
