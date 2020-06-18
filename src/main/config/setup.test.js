const request = require('supertest')
const App = require('./app')

describe('App setup', () => {
  test('Should disable x-powered-by header', async () => {
    App.get('/test', (req, res) => res.send(''))
    const res = await request(App)
      .get('/test')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })
})
