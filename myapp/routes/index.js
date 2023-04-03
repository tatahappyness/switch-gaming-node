const express = require('express')
const router_user = express.Router()

require('dotenv').config()

/* GET home page. */
router_user.get('/', function(req, res, next) {
  res.render('pages/index-3', 
    { 
      title: 'Switch-gaming', 
      menus: JSON.parse(JSON.stringify(process.env.MENUS)).split(','),

    });
});

router_user.get('/products', function(req, res, next) {
  res.render('pages/shop-grid-2', 
    { 
      title: 'Switch-gaming', 
      menus: JSON.parse(JSON.stringify(process.env.MENUS)).split(','),
    });
});

router_user.get('/vendors', function(req, res, next) {
  res.render('pages/shop-vendor-list', 
    { 
      title: 'Switch-gaming', 
      menus: JSON.parse(JSON.stringify(process.env.MENUS)).split(','),
    });
});

module.exports = router_user;
