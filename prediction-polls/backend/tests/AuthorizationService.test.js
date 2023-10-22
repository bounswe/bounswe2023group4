const app = require('../src/app.js')
const request = require('supertest')

test('test if we get accessToken at login', async () => {
    const response = await request(app).post('/login').send({"username" : "testUsername","password": "asdadasd"})
    expect(response.body.accessToken).not.toBe(undefined)
})


