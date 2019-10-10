const { error } = require('../config');
const { errors } = require('celebrate');

module.exports = function (app) { 
    app.use('/aluno', require('./AlunoRoute'));
    app.use('/atividade', require('./AtividadeRoute'));
    app.use('/atividade-curso', require('./AtividadeCursoRoute'));
    app.use('/atividade-lazer', require('./AtividadeLazerRoute'));
    app.use('/atividade-materia', require('./AtividadeMateriaRoute'));
    app.use('/avatar', require('./AvatarRoute'));
    app.use('/curso', require('./CursoRoute'));
    app.use('/materia', require('./MateriaRoute'));
    app.use('/checklist', require('./ChecklistRoute'));
    app.use('/opcao-checklist', require('./OpcaoChecklistRoute'));
    app.use(errors());
    
    // Rota não encontrada
    app.use(function(req, res, next){
        res.status(error.notFound.status).send(error.notFound.response);
    });
};