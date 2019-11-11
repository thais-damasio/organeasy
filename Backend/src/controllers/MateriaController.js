const { error, success } = require('../config');
const { Materia, Curso } = require('../models');

// GET: /
exports.index = async (req, res) => {
    try {
        let materias = await Materia.findAll({
            include: [
                {
                    association: 'curso',
                    required: true,
                    where: {id_aluno: req.user.id},
                },
                {
                    association: 'atividadesMateria'
                },
            ]
        });

        let resHttp = success.customSuccess(null,materias)
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
        let curso = await Curso.findOne({
            where: {                
                id: req.body.id_curso,
                id_aluno: req.user.id,
            }
        });

        if(curso && !curso.tem_materias){
            let resHttp = error.customForbidden("Não pode inserir matérias em um curso marcado que não tem matérias!");
            res.status(resHttp.status).send(resHttp.response);
        }
        else if(curso) {
            let materia = await Materia.create(req.body);

            let resHttp = success.customCreated(null, materia)
            res.status(resHttp.status).json(resHttp.response);
        }
        else {
            let resHttp = error.customNotFound("O curso associado não foi encontrado!");
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
        let materia = await Materia.findOne({ 
            where: { 
                id: id
            },
            include: [
                { 
                    association: 'curso',
                    required: true,
                    where: {
                        id_aluno: req.user.id
                    }
                },
                {
                    association: 'atividadesMateria',
                    include: [{association: 'atividade'}]
                }
            ]
        });        
        
        res.status(success.ok.status).send(materia || {});
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
        let materia = await Materia.findOne({ 
            where: { 
                id: id,
            },
            include: [
                {
                    association: 'curso',
                    required: true,
                    where: {
                        id_aluno: req.user.id
                    }
                }
            ]
        });
        if(materia){
            await materia.update(req.body);
            res.status(success.ok.status).send(materia || {});
        }
        else {
            let resHttp = error.customNotFound("Matéria não encontrada!");
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
        let materia = await Materia.findOne({ 
            where: { 
                id: id
            },
            include: [
                {
                    association: 'curso',
                    required: true,
                    where: {
                        id_aluno: req.user.id
                    }
                }
            ]
        });
        if(materia){
            await materia.destroy();
            let resHttp = success.customSuccess(`A matéria "${materia.nome}" foi apagada do curso de "${materia.curso.nome}"!`, null)
            res.status(resHttp.status).send(resHttp.response);
        }
        else {
            let resHttp = error.customNotFound("Matéria não encontrado!")
            res.status(resHttp.status).send(resHttp.response);
        }
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);
    }
};