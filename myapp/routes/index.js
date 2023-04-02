var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

router.get('/products', function(req, res, next) {
  res.render('pages/shop-fullwidth', { title: 'Express' });
});

router.get('/vendors', function(req, res, next) {
  res.render('pages/shop-vendor-list', { title: 'Express' });
});

module.exports = router;
