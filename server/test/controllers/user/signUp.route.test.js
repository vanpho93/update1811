const assert = require('assert');
const request = require('supertest');
const User = require('../../../src/models/User');
const app = require('../../../src/app');

describe('Test POST /user/signup', () => {
    it('Can sign up by POST', async () => {
        const response = await request(app)
        .post('/user/signup')
        .send({ email: 'teo@gmail.com', password: '123', name: 'Teo' });
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
        const { email, name } = response.body.user;
        assert.equal(email, 'teo@gmail.com');
        assert.equal(name, 'Teo');
        const user = await User.findOne({});
        assert.equal(user.email, 'teo@gmail.com');
        assert.equal(user.name, 'Teo');
    });

    it('Cannot sign up with dup email', async () => {
        await User.signUp('teo@gmail.com', '123', 'TEO');
        const response = await request(app)
        .post('/user/signup')
        .send({ email: 'teo@gmail.com', password: '321', name: 'Teo 2' });
        assert.equal(response.body.success, false);
    });

    it('Cannot sign up without email', async () => {
        const response = await request(app)
        .post('/user/signup')
        .send({ email: '', password: '321', name: 'Teo 2' });
        assert.equal(response.body.success, false);
    });
});
