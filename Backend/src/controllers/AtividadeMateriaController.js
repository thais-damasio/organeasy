const { error, success } = require('../config');
const { AtividadeMateria, Atividade, Curso, Materia } = require('../models');

// GET: /
exports.index = async (req, res) => {
    try {
        let atividadesMateria = await AtividadeMateria.findAll({
            include: [
                {association: 'atividade'},
                {
                    association: 'materia',
                    required: true,
                    include: [
                        {
                            association: 'curso',
                            required: true,
                            where: {id_aluno: req.user.id}
                        },
                    ]
                }
            ]
        });

        let resHttp = success.customSuccess(null, atividadesMateria);
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
        let materia = await Materia.findOne({
            where: {
                id: req.body.id_materia,
            },
            include: [{
                association: 'curso',
                required: true,
                where: {
                    id_aluno: req.user.id
                }
            }]
        });
        if(materia) {
            let atividadeMateriaData = {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                concluida: req.body.concluida,
                data_entrega: req.body.data_entrega,
                atividadesMateria: {
                    id_materia: materia.id,
                    tem_pontos: req.body.tem_pontos,
                    valor: req.body.valor,
                    valor_ganho: req.body.valor_ganho
                }
            }
            let atividadeMateria = await Atividade.create(atividadeMateriaData, 
            {
                include: [
                    { association: 'atividadesMateria'}
                ]
            });

            let resHttp = success.customCreated(null, atividadeMateria);
            res.status(resHttp.status).json(resHttp.response);
        }
        else {
            let resHttp = error.customNotFound("A matéria associada não foi encontrada!");
            res.status(resHttp.status).send(resHttp.response);
        }
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
        let atividade = await AtividadeMateria.findOne({ 
            where: { 
                id: id
            },
            include: [
                { association: 'atividade'},
                { 
                    association: 'materia',
                    required: true,
                    include: [{
                        association: 'curso',
                        required: true,
                        where: {id_aluno: req.user.id}
                    }]
                },
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
        let atividadeMateria = await AtividadeMateria.findOne({ 
            where: { 
                id: id
            },
            include: [
                {association: 'atividade'},
                {
                    association: 'materia',
                    required: true,
                    include: [{
                        association: 'curso',
                        required: true,
                        where: {id_aluno: req.user.id}
                    }]
                }
            ]
        });
        if(atividadeMateria){
            await atividadeMateria.update(req.body);
            await atividadeMateria.atividade.update(req.body);

            res.status(success.ok.status).send(atividadeMateria || {});
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
        let atividadeMateria = await AtividadeMateria.findOne({ 
            where: { 
                id: id
            },
            include: [
                {association: 'atividade'},
                {
                    association: 'materia',
                    required: true,
                    include: [{
                        association: 'curso',
                        required: true,
                        where: {id_aluno: req.user.id}
                    }]
                },
            ]
        });
        if(atividadeMateria){
            await atividadeMateria.destroy();
            let resHttp = success.customSuccess(`A atividade de "${atividadeMateria.atividade.titulo}" da matéria de "${atividadeMateria.materia.nome}" foi apagada!`);
            res.status(resHttp.status).send(resHttp.response);
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