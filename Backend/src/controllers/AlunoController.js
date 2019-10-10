const { Aluno } = require('../models');
const passport = require('passport');
const { error, success } = require('../config');

// POST: /login
exports.login = (req, res) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            res.status(error.serverError.status).send(error.serverError.response);
            throw Error(err);
        }
        if (!user) {
            res.status(error.forbidden.status).send(error.forbidden.response);
            throw Error();
        }
        res.send(user);
    })(req, res);
}

//POST: /checkemail
exports.checkemail = async (req, res) => {
    let isUnique = await Aluno.isUniqueEmail(req.body.email)
        .catch(err => {
            let errorHandler = error.serverError;
            errorHandler.response.error = err;
            res.status(errorHandler.status).send(errorHandler.response);
            throw Error(err);
        });
    if (isUnique)
        res.status(success.ok.status).send(success.ok.response);
    else
        res.status(error.alreadyExist.status).send(error.alreadyExist.response);
}

// GET: /:id
exports.details = async (req, res) => {
    let id = req.params.id;
    let aluno = await Aluno.findOne({ where: { id: id } })
        .catch(err => {
            let errorHandler = error.serverError;
            errorHandler.response.error = err;
            res.status(errorHandler.status).send(errorHandler.response);
            throw Error(err);
        })

    res.status(success.ok.status).send(aluno);
};

//POST: 
exports.post = async (req, res) => {
    let isUnique = await Aluno.isUniqueEmail(req.body.email)
        .catch(err => {
            let errorHandler = error.serverError;
            errorHandler.response.error = err;
            res.status(errorHandler.status).send(errorHandler.response);
            throw Error(err);
        });

    if (isUnique) {
        let aluno = await Aluno.create(req.body)
            .catch(err => {
                let errorHandler = error.serverError;
                errorHandler.response.error = err;
                res.status(errorHandler.status).send(errorHandler.response);
                throw Error(err);
            });
        res.status(success.created.status).send(aluno);
    }
    else {
        res.status(error.alreadyExist.status).send(error.alreadyExist.response);
    }

};
//PUT: /update/:id
exports.put = (req, res) => {
    let id = req.params.id;
    res.status(error.notImplemented.status).send(error.notImplemented.response);
};

// DELETE: /delete/:id
exports.delete = (req, res) => {
    let id = req.params.id;
    res.status(error.notImplemented.status).send(error.notImplemented.response);
};