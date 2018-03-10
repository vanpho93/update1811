const express = require('express');
const Story = require('../models/Story');
const Comment = require('../models/Comment');
const mustBeUser = require('./mustBeUser.middleware');
const parser = require('body-parser').json();

const router = express.Router();

router.post('/:idObject', mustBeUser, parser, (req, res) => {
    const { forComment } = req.body;
    if(forComment) {
        return Comment.likeComment(req.idUser, req.params.idObject)
        .then(comment => res.send({ success: true, comment }))
        .catch(err => res.status(404).send({ success: false, message: err.message }));
    }
    Story.likeAStory(req.idUser, req.params.idObject)
    .then(story => res.send({ success: true, story }))
    .catch(err => res.status(404).send({ success: false, message: err.message }));
});

module.exports = router;
