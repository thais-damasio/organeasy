const { error, success } = require('../config');
const { AtividadeCurso, Atividade, Curso } = require('../models');

// GET: /
exports.index = async (req, res) => {
    try {
        let atividadesCurso = await AtividadeCurso.findAll({
            include: [
                {association: 'atividade'},
                {
                    association: 'curso',
                    required: true,
                    where: {id_aluno: req.user.id}
                },
            ]
        });

        let resHttp = success.customSuccess(null, atividadesCurso);
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
                id_aluno: req.user.id
            }
        });
        if(curso && curso.tem_materias){
            let resHttp = error.customForbidden("Não pode inserir atividades diretamente em um curso marcado que tem matérias!");
            res.status(resHttp.status).send(resHttp.response);
        }
        else if(curso) {
            let atividadeCursoData = {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                concluida: req.body.concluida,
                data_entrega: req.body.data_entrega,
                atividadesCurso: {
                    id_curso: curso.id,
                    tem_pontos: req.body.tem_pontos,
                    valor: req.body.valor,
                    valor_ganho: req.body.valor_ganho
                }
            }
            let atividadeCurso = await Atividade.create(atividadeCursoData, 
            {
                include: [
                    { association: 'atividadesCurso'}
                ]
            });

            let resHttp = success.customCreated(null, atividadeCurso);
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
        let atividade = await AtividadeCurso.findOne({ 
            where: { 
                id: id
            },
            include: [
                { association: 'atividade'},
                { 
                    association: 'curso',
                    where: {id_aluno: req.user.id}
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
        let atividadeCurso = await AtividadeCurso.findOne({ 
            where: { 
                id: id
            },
            include: [
                {association: 'atividade'},
                {
                    association: 'curso',
                    where: {
                        id_aluno: req.user.id
                    }
                }
            ]
        });
        if(atividadeCurso){
            await atividadeCurso.update(req.body);
            await atividadeCurso.atividade.update(req.body);

            res.status(success.ok.status).send(atividadeCurso || {});
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
        let atividadeCurso = await AtividadeCurso.findOne({ 
            where: { 
                id: id
            },
            include: [
                {association: 'atividade'},
                {
                    association: 'curso',
                    where: {id_aluno: req.user.id}
                },
            ]
        });
        if(atividadeCurso){
            await atividadeCurso.destroy();
            let resHttp = success.customSuccess(`A atividade de "${atividadeCurso.atividade.titulo}" do curso de "${atividadeCurso.curso.nome}" foi apagada!`);
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