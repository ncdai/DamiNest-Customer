const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('products/index');
});

module.exports = router;
