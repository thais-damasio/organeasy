// Arquivos de configuração
var express = require('express');
var passport = require('passport')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
require('./auth')(passport);


// Demais configurações
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Rotas da aplicação
require('./src/routes')(app);

// Server
require('./server')(app);

module.exports = app;