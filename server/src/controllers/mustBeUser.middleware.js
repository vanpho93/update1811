const { verify } = require('../lib/jwt');

const mustBeUser = (req, res, next) => {
    verify(req.headers.token)
    .then(obj => {
        req.idUser = obj._id;
        next();
    })
    .catch(error => res.status(400).send({ success: false, error: error.message }));
}

module.exports = mustBeUser;
