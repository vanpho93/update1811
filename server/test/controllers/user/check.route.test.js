const assert = require('assert');
const request = require('supertest');
const User = require('../../../src/models/User');
const app = require('../../../src/app');
const { verify } = require('../../../src/lib/jwt');

describe('Test POST /user/check', () => {
    let token;
    beforeEach('Create user for test', async () => {
        await User.signUp('pho1@gmail.com', '123', 'Pho');
        const user = await User.signIn('pho1@gmail.com', '123');
        token = user.token;
    });

    it('Can check sign in status by POST', async () => {
        const response = await request(app)
        .post('/user/check')
        .set({ token });
        const { success, user } = response.body;
        const { email, name, _id } = user;
        assert.equal(success, true);
        assert.equal(email, 'pho1@gmail.com');
        assert.equal(name, 'Pho');
        const obj = await verify(token);
        assert.equal(obj._id, _id)
    });

    it('Can check sign in status with wrong token', async () => {
        const response = await request(app)
        .post('/user/check')
        .set({ token: token + 'x' });
        assert.equal(response.body.success, false);
    });

    it('Can check sign in status without token', async () => {
        const response = await request(app)
        .post('/user/check');
        assert.equal(response.body.success, false);
    });
});
