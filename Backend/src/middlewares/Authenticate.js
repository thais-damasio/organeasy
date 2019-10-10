const { error } = require('../config');

module.exports = function (req, res, next) {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(error.unauthorized.status).send(error.unauthorized.response);
}