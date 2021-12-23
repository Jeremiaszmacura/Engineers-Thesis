const request = require('supertest');
const app = require('../server.js');


describe('POST /users/login', () => {

    test('respond with a 200 status code', async () => {
        const response = await request(app).post('/users/login').send({
            email: 'email',
            password: 'password'
        });
    expect(response.statusCode).toBe(200);
    });
    
    test('specify json in the content type header', async () => {
        const response = await request(app).post('/users/login').send({
            email: 'email',
            password: 'password'
        });
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    test('successful login', async () => {
        const response = await request(app).post('/users/login').send({
            email: 'bob@email.com',
            password: '123456'
        });
    expect(response.body.message).toBe('Successfully Authenticated');
    });

    test('login failed', async () => {
        const response = await request(app).post('/users/login').send({
            email: 'email',
            password: 'password'
        });
    expect(response.body).toBe('Wrong username or password');
    });

});
