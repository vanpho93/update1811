const assert = require('assert');
const request = require('supertest');
const Story = require('../../../src/models/Story');
const User = require('../../../src/models/User');
const app = require('../../../src/app');

describe('Test POST /story', () => {
    let token;
    beforeEach('Create user for test', async () => {
        await User.signUp('pho1@gmail.com', '123', 'Pho');
        const user = await User.signIn('pho1@gmail.com', '123');
        token = user.token;
    });

    it('Can add new story by POST', async () => {
        const response = await request(app)
        .post('/story')
        .set({ token })
        .send({ content: 'Javascript', title: 'JS' });
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
        assert.equal(response.body.story.title, 'JS');
        const story = await Story.findOne({}).populate('author');
        assert.equal(story.title, 'JS');
        assert.equal(story.content, 'Javascript');
        assert.equal(story.author.email, 'pho1@gmail.com');
    });

    it('Cannot add new story without token', async () => {
        const response = await request(app)
        .post('/story')
        .send({ content: 'Javascript', title: 'JS' });
        assert.equal(response.status, 400);
    });
});
