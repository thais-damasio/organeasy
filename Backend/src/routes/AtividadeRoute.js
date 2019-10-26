const controller = require('../controllers/AtividadeController')
const passport = require('passport');
var express = require('express');
var router = express.Router();

// Todos as atividades
router.get('/',
[passport.authenticate('jwt', {session: false})],
controller.index);

module.exports = router;
