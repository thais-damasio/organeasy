const express = require('express');
const router = express.Router();
const controller = require('../controllers/AlunoController')
const authenticate = require('../middlewares/Authenticate');
const { celebrate, Joi, errors } = require('celebrate');

// Login
router.post('/login', 
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
router.get('/get/:id', [authenticate], controller.details);

// Atualização
router.put('/update/:id', [authenticate], controller.put);

// Remoção
router.delete('/delete/:id', [authenticate], controller.delete);


module.exports = router;