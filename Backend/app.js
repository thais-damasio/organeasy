var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var alunoRouter = require('./routes/aluno');
var atividadeRouter = require('./routes/atividade');
var atividadeCursoRouter = require('./routes/atividadeCurso');
var atividadeLazerRouter = require('./routes/atividadeLazer');
var atividadeMateriaRouter = require('./routes/atividadeMateria');
var avatarRouter = require('./routes/avatar');
var cursoRouter = require('./routes/curso');
var materiaRouter = require('./routes/materia');
var opcaoChecklistRouter = require('./routes/opcaoChecklist');
const port = 3500

var app = express();

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/aluno', alunoRouter);

const { Aluno } = require('./app/models/index.js');
Aluno.create({ nome: 'Claudio', email: 'claudio@rocketseat.com.br', senha: '123456', criado_em: new Date() })
    .then(task => {
        console.log(task)
    })
    .catch(err => {
        console.log(err)
    })
module.exports = app;
