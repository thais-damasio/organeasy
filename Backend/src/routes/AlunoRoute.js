const controller = require('../controllers/AlunoController')
const { celebrate, Joi } = require('celebrate');
const passport = require('passport');
const express = require('express');
const router = express.Router();

// Login
router.post('/login/', 
[celebrate({
    body: Joi.object().keys({
      email: Joi.string().max(255).required(),
      senha: Joi.string().max(255).required(),
    })
})],
controller.login);

// Checa se e-mail já existe
router.post('/checkemail/', 
[celebrate({
    body: Joi.object().keys({
      email: Joi.string().max(255).required()
    })
})],
 controller.checkemail);

// Cadastro
router.post('/create/', 
[celebrate({
    body: Joi.object().keys({
      email: Joi.string().max(255).required(),
      nome: Joi.string().max(255).required(),
      senha: Joi.string().max(255).required(),
      id_avatar: Joi.number().integer(),
    })
})],
 controller.post);

// Detalhes
router.get('/get/',
[passport.authenticate('jwt', {session: false})],
controller.details);

// TODO: Atualização
router.put('/update/',
[passport.authenticate('jwt', {session: false})],
controller.put);

// TODO: Remoção
router.delete('/delete/',
[passport.authenticate('jwt', {session: false})],
controller.delete);


module.exports = router;