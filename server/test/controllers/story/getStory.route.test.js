const assert = require('assert');
const request = require('supertest');
const Story = require('../../../src/models/Story');
const app = require('../../../src/app');

describe('Test GET /story ', () => {
    it('Can get all story', async () => {
        await Story.addStory('JS', 'Javascript');
        await Story.addStory('ES6', 'Javascript ES6');
        await Story.addStory('PHP', 'PHP 123 ES6');
        const response = await request(app).get('/story');
        assert.equal(response.body.success, true);
        assert.equal(response.body.stories.length, 3);
    });

    it('Can get story with id', async () => {
        const { _id } = await Story.addStory('PHP', 'abcd');
        const response = await request(app).get(`/story/${_id}`);
        assert.equal(response.body.success, true);
        assert.equal(response.body.story.title, 'PHP');
        assert.equal(response.body.story.content, 'abcd');
    });

    it('Cannot get story with wrong id', async () => {
        await Story.addStory('PHP', 'abcd');
        const response = await request(app).get(`/story/1231827381`);
        assert.equal(response.body.success, false);
    });
});
