const request = require('supertest')
const App = require('./app')

describe('App setup', () => {
  test('Should disable x-powered-by header', async () => {
    App.get('/test', (req, res) => res.send(''))
    const res = await request(App)
      .get('/test')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })

  test('Should enable cors', async () => {
    App.get('/cors', (req, res) => res.send(''))

    const res = await request(App).get('/cors')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
