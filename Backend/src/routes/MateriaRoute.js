const controller = require('../controllers/MateriaController')
const { celebrate, Joi } = require('celebrate');
const passport = require('passport');
var express = require('express');
var router = express.Router();

// Todos as matérias
router.get('/',
[passport.authenticate('jwt', {session: false})],
controller.index);

// Cadastro
router.post('/create/', 
[celebrate({
    body: Joi.object().keys({
      id_curso: Joi.number().integer().required(),
      nome: Joi.string().max(255).required()
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
      nome: Joi.string().max(255)
    })
}),
passport.authenticate('jwt', {session: false})],
controller.put);

// Remoção
router.delete('/delete/:id',
[passport.authenticate('jwt', {session: false})],
controller.delete);

module.exports = router;
