const controller = require('../controllers/AtividadeController')
const passport = require('passport');
var express = require('express');
var router = express.Router();

// Todos as atividades
router.get('/',
[passport.authenticate('jwt', {session: false})],
controller.index);

// Atividades por mês
router.get('/by-month/:mes/:ano',
[passport.authenticate('jwt', {session: false})],
controller.atividadesByMonth);

// Atividades por mês
router.get('/by-week/:data',
[passport.authenticate('jwt', {session: false})],
controller.atividadesByWeek);

// Atividades de hoje
router.get('/today/:data',
[passport.authenticate('jwt', {session: false})],
controller.atividadesToday);

// Atividades estatísticas
router.get('/estatisticas/:mes/:ano',
[passport.authenticate('jwt', {session: false})],
controller.atividadesEstatistcas);



module.exports = router;
