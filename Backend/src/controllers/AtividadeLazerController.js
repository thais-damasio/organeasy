const { error, success } = require('../config');
const { AtividadeLazer, Atividade } = require('../models');

// GET: /
exports.index = async (req, res) => {
    try {
        let atividadesLazer = await AtividadeLazer.findAll({
            where: {id_aluno: req.user.id},
            include: [
                {
                    association: 'atividade',
                },
            ],
            order: [
                ['atividade', 'titulo', 'ASC'],
            ],
        });

        let resHttp = success.customSuccess(null,atividadesLazer)
        res.status(resHttp.status).json(resHttp.response);
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);        
    }
}

// POST: /create/
exports.post = async (req, res) => {
    try {
        let atividadeLazerData = Object.assign(req.body, { atividadesLazer: { id_aluno: req.user.id }});
        let atividadesLazer = await Atividade.create(atividadeLazerData, 
          {
            include: [
                { association: 'atividadesLazer'}
            ]
          });

        let resHttp = success.customCreated(null, atividadesLazer)
        res.status(resHttp.status).json(resHttp.response);
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);        
    }
}

// GET: /get/:id
exports.details = async (req, res) => {
    let id = req.params.id;
    try {
        let atividade = await AtividadeLazer.findOne({ 
            where: { 
                id: id,
                id_aluno: req.user.id
            },
            include: [
                { association: 'atividade'},
            ]
        });        
        
        res.status(success.ok.status).send(atividade || {});
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);
    }
};

//PUT: /update/:id
exports.put = async (req, res) => {
    let id = req.params.id;
    try {
        let atividadeLazer = await AtividadeLazer.findOne({ 
            where: { 
                id: id,
                id_aluno: req.user.id
            },
            include: [
                {association: 'atividade'}
            ]
        });
        if(atividadeLazer){
            await atividadeLazer.atividade.update(req.body);
            res.status(success.ok.status).send(atividadeLazer || {});
        }
        else {
            let resHttp = error.customNotFound("Atividade não encontrada!");
            res.status(resHttp.status).send(resHttp.response);
        }
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);
    }
};

// DELETE: /delete/:id
exports.delete = async (req, res) => {
    let id = req.params.id;
    try {
        let atividadeLazer = await AtividadeLazer.findOne({ 
            where: { 
                id: id,
                id_aluno: req.user.id
            },
            include: [
                {association: 'atividade'}
            ]
        });
        if(atividadeLazer){
            await atividadeLazer.destroy();
            let resHttp = success.customSuccess(`A atividade de "${atividadeLazer.atividade.titulo}" foi apagada!`, null)
            res.status(resHttp.status).send(resHttp.response);
        }
        else {
            let resHttp = error.customNotFound("Atividade não encontrado!")
            res.status(resHttp.status).send(resHttp.response);
        }
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);
    }
};