const assert = require('assert');
const request = require('supertest');
const Story = require('../../../src/models/Story');
const User = require('../../../src/models/User');
const Comment = require('../../../src/models/Comment');
const app = require('../../../src/app');

describe('POST /comment', () => {
    let token1, token2, storyId;

    beforeEach('Create user for test', async () => {
        await User.signUp('pho1@gmail.com', '123', 'Pho');
        await User.signUp('pho2@gmail.com', '123', 'Pho 2');
        const user1 = await User.signIn('pho1@gmail.com', '123');
        const user2 = await User.signIn('pho2@gmail.com', '123');
        const story = await Story.addStoryWithUser(user1._id, 'JS', 'Javascript');
        await Story.addStoryWithUser(user1._id, 'PHP', 'My SQL');
        token1 = user1.token;
        token2 = user2.token;
        storyId = story._id.toString();
    });

    it('Can create new comment for story', async () => {
        const response = await request(app)
        .post('/comment')
        .set({ token: token2 })
        .send({ content: 'MEAN1811', storyId });
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
        assert.equal(response.body.comment.content, 'MEAN1811');
        const story = await Story.findById(storyId).populate('comments');
        assert.equal(story.comments.length, 1);
        assert.equal(story.comments[0].content, 'MEAN1811');
    });

    it('Cannot add comment without token', async () => {
        const response = await request(app)
        .post('/comment')
        .send({ content: 'MEAN1811', storyId });
        assert.equal(response.status, 400);
        assert.equal(response.body.success, false);
    });

    it('Cannot add comment with wrong idStory', async () => {
        const response = await request(app)
        .post('/comment')
        .send({ content: 'MEAN1811', storyId: 'jedq8eu02ie9ruifjdkac' });
        assert.equal(response.status, 400);
        assert.equal(response.body.success, false);
    });

    it('Cannot add comment without content', async () => {
        const response = await request(app)
        .post('/comment')
        .send({ storyId });
        assert.equal(response.status, 400);
        assert.equal(response.body.success, false);
    });
});
