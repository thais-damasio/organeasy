const express = require('express');
const router = express.Router();
const controller = require('../controllers/AlunoController')
var passport = require('passport');

function authenticationMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/aluno/teste?fail=true')
    }
}
router.get('/teste', function (req, res) {
    if (req.query.fail)
        res.send({ message: 'Usuário e/ou senha incorretos!' });
    else
        res.send({ message: 'Aqui vc loga' });
});

router.post('/teste',
    passport.authenticate('local', { successRedirect: '/chat', failureRedirect: '/aluno/teste?fail=true' })
);
router.get('/chat', authenticationMiddleware (), function(req, res){
    res.send({ username: req.user.username });
 });
router.get('/:id', controller.details);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);


module.exports = router;