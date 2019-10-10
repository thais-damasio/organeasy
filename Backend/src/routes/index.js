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
};