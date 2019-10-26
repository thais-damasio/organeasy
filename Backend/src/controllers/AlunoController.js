const { error, success } = require('../config');
const { Aluno } = require('../models');
const jwt = require('jsonwebtoken');

// POST: /login/
exports.login = async (req, res) => {
    try {
        let aluno = await Aluno.findOne({where: {email: req.body.email}, include: [{association: 'avatar'}]});
        
        if (!aluno) {
            res.status(error.forbidden.status).send(error.forbidden.responseEmail);
            return;
        }
        
        let payload = {
            email: aluno.email,
            senha: aluno.senha,
        }
        // comparando as senhas
        if(aluno.validPassword(req.body.senha)){
            jwt.sign(payload, process.env.SESSION_KEY,
                (err, token) => {
                if (err) {
                    let errorHandler = error.customServerError(err);
                    res.status(errorHandler.status).send(errorHandler.response);
                }
                else {
                    let user = { id: aluno.id, nome: aluno.nome, email: aluno.email, avatar: aluno.avatar}
                    res.status(success.ok.status).json({ success: true, user: user, token: `Bearer ${token}` });
                }
            });
        }
        else {
            res.status(error.forbidden.status).send(error.forbidden.responsePswd);
            return;
        }
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);        
    }
}

//POST: /checkemail/
exports.checkemail = async (req, res) => {
    try {
        let isUnique = await Aluno.isUniqueEmail(req.body.email);
        if (isUnique)
            res.status(success.ok.status).send(success.ok.response);
        else
            res.status(error.alreadyExist.status).send(error.alreadyExist.response);
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);
    }
}

// GET: /get/
exports.details = async (req, res) => {
    try {
        let aluno = await Aluno.findOne({ where: { id: req.user.id }, include: [{association: 'avatar'}] });        
        res.status(success.ok.status).send(aluno || {});
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);
    }
};

//POST: /create/
exports.post = async (req, res) => {
    try {
        let isUnique = await Aluno.isUniqueEmail(req.body.email);
        if (isUnique) {
            let aluno = await Aluno.create(req.body); 
            let avatar = await aluno.getAvatar();
            
            // Autentica o usuário
            let payload = {
                email: aluno.email,
                senha: aluno.senha,
            }
            jwt.sign(payload, process.env.SESSION_KEY,
                (err, token) => {
                if (err) {
                    let errorHandler = error.customServerError(err);
                    res.status(errorHandler.status).send(errorHandler.response);
                }
                else {
                    let user = { id: aluno.id, nome: aluno.nome, email: aluno.email, avatar: avatar}
                    res.status(success.created.status).json({ success: true, user: user, token: `Bearer ${token}` });
                }
            });   
        }
        else {
            res.status(error.alreadyExist.status).send(error.alreadyExist.response);
        }
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);
    }

};

//PUT: /update/
exports.put = (req, res) => {
    let id = req.params.id;
    res.status(error.notImplemented.status).send(error.notImplemented.response);
};

// DELETE: /delete/
exports.delete = (req, res) => {
    let id = req.params.id;
    res.status(error.notImplemented.status).send(error.notImplemented.response);
};