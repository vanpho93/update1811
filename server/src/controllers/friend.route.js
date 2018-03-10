const express = require('express');
const parser = require('body-parser').json();
const User = require('../models/User');
const mustBeUser = require('./mustBeUser.middleware');

const friendRoute = express.Router();
friendRoute.use(mustBeUser)

friendRoute.post('/request', parser, (req, res) => {
    User.addFriend(req.idUser, req.body.idFriend)
    .then(friend => res.send({ success: true, friend }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});

friendRoute.post('/accept', parser, (req, res) => {
    User.acceptFriend(req.idUser, req.body.idFriend)
    .then(friend => res.send({ success: true, friend }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});

friendRoute.delete('/:idFriend', (req, res) => {
    User.removeFriend(req.idUser, req.params.idFriend)
    .then(friend => res.send({ success: true, friend }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});

module.exports = friendRoute;
