const controller = require('../controllers/CursoController')
const { celebrate, Joi } = require('celebrate');
const passport = require('passport');
var express = require('express');
var router = express.Router();

// Todos os cursos
router.get('/',
[passport.authenticate('jwt', {session: false})],
controller.index);

// Cadastro
router.post('/create/', 
[celebrate({
    body: Joi.object().keys({
      nome: Joi.string().max(255).required(),
      tem_materias: Joi.boolean().required()
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
      nome: Joi.string().max(255),
      tem_materias: Joi.boolean()
    })
}),
passport.authenticate('jwt', {session: false})],
controller.put);

// Remoção
router.delete('/delete/:id',
[passport.authenticate('jwt', {session: false})],
controller.delete);

module.exports = router;
