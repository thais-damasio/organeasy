// Arquivos de configuração
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const { error } = require('./src/config');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();
require('./src/middlewares/auth')(passport);


// Demais configurações
app.use(session({
    secret:'MyK3y',
    saveUninitialized:true,
    resave:true,
    cookie: {maxAge: 30000}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json({
    verify : (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch(e) {
      res.status(error.badrequest.status).send(error.badrequest.response);
      throw Error('invalid JSON');
    }
  }
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Rotas da aplicação
require('./src/routes')(app);

// Server
require('./server')(app);

module.exports = app;