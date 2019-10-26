const controller = require('../controllers/AtividadeMateriaController')
const { celebrate, Joi } = require('celebrate');
const passport = require('passport');
var express = require('express');
var router = express.Router();

// Todos as atividades de matérias
router.get('/',
[passport.authenticate('jwt', {session: false})],
controller.index);

// Cadastro
router.post('/create/', 
[celebrate({
    body: Joi.object().keys({
      // Para a atividadeMateria
      tem_pontos: Joi.boolean(),
      valor: Joi.number(),
      valor_ganho: Joi.number(),
      // Para a atividade
      titulo: Joi.string().max(255),
      descricao: Joi.string().max(255),
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
      // Para a atividadeMateria
      tem_pontos: Joi.boolean(),
      valor: Joi.number(),
      valor_ganho: Joi.number(),
      // Para a atividade
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
