const mongoose = require('mongoose');
const User = require('./User');

const storySchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    fans: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

const StoryModel = mongoose.model('Story', storySchema);

class Story extends StoryModel {
    static addStory(title, content) {
        const story = new Story({ content, title });
        return story.save()
    }

    static async addStoryWithUser(idUser, title, content) {
        const story = new Story({ title, content, author: idUser });
        await story.save();
        await User.findByIdAndUpdate(idUser, { $push: { stories: story._id } });
        return story;
    }

    static async likeAStory(idUser, idStory) {
        const updateObject = { $addToSet: { fans: idUser } };
        const story = await Story.findByIdAndUpdate(idStory, updateObject, { new: true });
        if (!story) throw new Error('Cannot find story');
        return story;
    }
}

module.exports = Story;
