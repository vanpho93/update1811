const assert = require('assert');
const Story = require('../../../src/models/Story');

describe('Test static method addStory', () => {
    it('Can add new story with full info', async () => {
        await Story.addStory('JS', 'abcd');
        const n = await Story.count({});
        assert.equal(n, 1);
        const story = await Story.findOne({});
        assert.equal(story.title, 'JS');
        assert.equal(story.content, 'abcd');
    });

    it('Cannot add a story with duplicated title', async () => {
        await Story.addStory('JS', 'abcd');
        try {
            await Story.addStory('JS', 'xyz');
            throw new Error('Test failed');
        } catch (err) {
            assert.equal(err.name, 'MongoError');
        }        
    });

    it('Cannot add a story without title', async () => {
        try {
            await Story.addStory(null, 'xyz');
            throw new Error('Test failed');
        } catch (err) {
            assert.equal(err.name, 'ValidationError');
        }
    });
});
