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
const cors = require('./src/middlewares/cors');
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config()

// Demais configurações
let sessionData = {
  secret: process.env.SESSION_KEY || 'MyK3y',
  saveUninitialized:process.env.SESSION_SAVEUNINITIALIZED || true,
  resave:process.env.SESSION_RESAVE || true,
  cookie: {maxAge: 30000}
}
app.use(session(sessionData));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json({
    verify : (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch(e) {
      res.status(error.badrequest.status).send(error.badrequest.response);
      throw Error('Invalid JSON');
    }
  }
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors);


// Rotas da aplicação
require('./src/routes')(app);

// Server
require('./server')(app);

module.exports = app;