var express = require('express');
var router = express.Router();

/* GET Atividade listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
