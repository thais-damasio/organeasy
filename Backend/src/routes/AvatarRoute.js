const controller = require('../controllers/AvatarController')
const express = require('express');
const router = express.Router();

// Retorna todos os avatares
router.get('/', controller.index);

module.exports = router;
