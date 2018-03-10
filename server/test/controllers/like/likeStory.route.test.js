const assert = require('assert');
const request = require('supertest');
const Story = require('../../../src/models/Story');
const User = require('../../../src/models/User');
const app = require('../../../src/app');

describe('POST /like', () => {
    let token1, token2, storyId;

    beforeEach('Create user for test', async () => {
        await User.signUp('pho1@gmail.com', '123', 'Pho');
        await User.signUp('pho2@gmail.com', '123', 'Pho');
        const user1 = await User.signIn('pho1@gmail.com', '123');
        const user2 = await User.signIn('pho2@gmail.com', '123');
        const story = await Story.addStoryWithUser(user1._id, 'JS', 'Javascript');
        await Story.addStoryWithUser(user1._id, 'PHP', 'My SQL');
        token1 = user1.token;
        token2 = user2.token;
        storyId = story._id;
    });

    it('Can like a story', async () => {
        const response = await request(app)
        .post(`/like/${storyId}`)
        .set({ token: token2 })
        .send({});
        assert.equal(response.status, 200);
        const story = await Story.findById(storyId).populate('fans');
        assert.equal(story.fans.length, 1);
        assert.equal(story.fans[0].email, 'pho2@gmail.com');
    });

    it('Cannot like a story with wrong ObjectID', async () => {
        const response = await request(app)
        .post(`/like/123`)
        .set({ token: token2 })
        .send({});
        assert.equal(response.status, 404);
        const story = await Story.findById(storyId).populate('fans');
        assert.equal(story.fans.length, 0);
    });

    it('Cannot like a story with wrong ObjectID', async () => {
        const response = await request(app)
        .post(`/like/5a50cdaff08e3716e43bbf46`)
        .set({ token: token2 })
        .send({});
        assert.equal(response.status, 404);
        assert.equal(response.body.success, false);
        assert.equal(response.body.message, 'Cannot find story');
        const story = await Story.findById(storyId).populate('fans');
        assert.equal(story.fans.length, 0);
    });
})