const controller = require('../controllers/AtividadeLazerController')
const { celebrate, Joi } = require('celebrate');
const passport = require('passport');
var express = require('express');
var router = express.Router();

// Todos as atividades de lazer
router.get('/',
[passport.authenticate('jwt', {session: false})],
controller.index);

// Cadastro
router.post('/create/', 
[celebrate({
    body: Joi.object().keys({
      titulo: Joi.string().max(255).required(),
      descricao: Joi.string().max(255).required(),
      concluida: Joi.boolean(),
      data_entrega: Joi.date()
    })
}),
passport.authenticate('jwt', {session: false})],
controller.post);

// Detalhes
router.get('/get/:id',
[passport.authenticate('jwt', {session: false})],
controller.details);

// Atualização
router.put('/update/:id', 
[celebrate({
    body: Joi.object().keys({
      titulo: Joi.string().max(255),
      descricao: Joi.string().max(255),
      concluida: Joi.boolean(),
      data_entrega: Joi.date()
    })
}),
passport.authenticate('jwt', {session: false})],
controller.put);

// Remoção
router.delete('/delete/:id',
[passport.authenticate('jwt', {session: false})],
controller.delete);

module.exports = router;
