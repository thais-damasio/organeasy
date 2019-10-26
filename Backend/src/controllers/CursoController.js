const { error, success } = require('../config');
const { Curso } = require('../models');

// GET: /
exports.index = async (req, res) => {
    try {
        let cursos = await Curso.findAll({
                where: {id_aluno: req.user.id},
                include: [
                    {association: 'materias'},
                    {association: 'atividadesCurso'},
                ]
            });

        let resHttp = success.customSuccess(null, cursos);
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
        let cursoData = Object.assign(req.body, {id_aluno: req.user.id});
        let curso = await Curso.create(cursoData); 

        let resHttp = success.customCreated(null, curso);
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
        let curso = await Curso.findOne({ 
            where: { 
                id: id,
                id_aluno: req.user.id
            },
            include: [
                {association: 'materias'},
                {association: 'atividadesCurso'},
            ]
        });        
        
        res.status(success.ok.status).send(curso || {});
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
        let curso = await Curso.findOne({ 
            where: { id: id, id_aluno: req.user.id},
            include: [
                {association: 'materias'},
                {association: 'atividadesCurso'},
            ]
        });
        if(curso){
            await curso.update(req.body);
            res.status(success.ok.status).send(curso || {});
        }
        else {
            let resHttp = error.customNotFound("Curso não encontrado!")
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
        let curso = await Curso.findOne({ 
            where: { id: id, id_aluno: req.user.id }
        });
        if(curso){
            await curso.destroy();
            let resHttp = success.customSuccess(`O curso de ${curso.nome} foi apagado!`, null);
            res.status(resHttp.status).send(resHttp.response);
        }
        else {
            let resHttp = error.customNotFound("Curso não encontrado!")
            res.status(resHttp.status).send(resHttp.response);
        }
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);
    }
};