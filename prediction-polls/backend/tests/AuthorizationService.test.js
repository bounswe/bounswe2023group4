const app = require('../src/controllers/AuthorizationController')
const request = require('supertest')

test('test if we get accessToken at login', async () => {
    const response = await request(app).post('/login').send({"name" : "testUsername"})
    expect(response.body.accessToken).not.toBe(undefined) 
})
