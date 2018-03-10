const express = require('express');
const parser = require('body-parser').json();
const Story = require('../models/Story');
const mustBeUser = require('./mustBeUser.middleware');

const router = express.Router();

router.get('/', (req, res) => {
    Story.find({}).populate('author', 'name')
    .then(stories => res.send({ success: true, stories }))
    .catch(error => res.send({ success: false, error: error.message }));
});

router.get('/:id', (req, res) => {
    Story.findById(req.params.id)
    .then(story => {
        if (!story) return res.status(404).send({
            success: false,
            message: 'Cannot find story'
        });
        res.send({ success: true, story });
    })
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});

router.post('/', mustBeUser, parser, (req, res) => {
    const { content, title } = req.body;
    Story.addStoryWithUser(req.idUser, title, content)
    .then(newStory => res.send({ success: true, story: newStory }))
    .catch(error => res.status(400).send({ success: false, error: error.message }));
});

router.delete('/:id', mustBeUser, (req, res) => {
    Story.findOneAndRemove({ _id: req.params.id, author: req.idUser })
    .then(story => {
        if (!story) return res.status(404).send({
            success: false,
            message: 'Cannot find story'
        });
        res.send({ success: true, story });
    })
    .catch(error => res.status(400).send({ success: false, error: error.message }))
});

module.exports = router;
