const mongoose = require('mongoose');
const User = require('./User');
const Story = require('./Story');

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' },
    content: { type: String, required: true },
    fans: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const CommentModel = mongoose.model('Comment', commentSchema);

class Comment extends CommentModel {
    static async createComment(idUser, idStory, content) {
        const story = await Story.findById(idStory);
        if (!story) throw new Error('Cannot find story');
        const comment = new Comment({ user: idUser, content, story: idStory });
        await comment.save();
        const updateObject = { $push: { comments: comment._id } };
        await Story.findByIdAndUpdate(idStory, updateObject);
        return comment;
    }

    static async removeComment(idUser, idComment) {
        const comment = await Comment.findOneAndRemove({ _id: idComment, user: idUser });
        if (!comment) throw new Error('Cannot find comment.');
        const { _id, story } = comment;
        await Story.findByIdAndUpdate(story, { $pull: { comments: _id } });
        return comment;
    }

    static async likeComment(idUser, idComment) {
        const updateObject = { $addToSet: { fans: idUser } };
        const comment = await Comment.findByIdAndUpdate(idComment, updateObject, { new: true });
        if (!comment) throw new Error('Cannot find comment.');
        return comment;
    }
}

module.exports = Comment;
