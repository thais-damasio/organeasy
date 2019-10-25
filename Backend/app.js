// Arquivos de configuração
const express = require('express');
const cors = require('./src/middlewares/cors');
const cookieParser = require('cookie-parser');
const { error } = require('./src/config');
const logger = require('morgan');
const path = require('path');
const app = express();
require('./src/middlewares/auth')(app);
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config()


// Demais configurações
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


// // Server
require('./server')(app);

module.exports = app;