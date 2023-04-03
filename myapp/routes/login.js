const express = require('express');
const router_login = express.Router(); 

router_login.get('/', function(req, res, next) {
  res.render('pages/index-3', 
    { 
      title: 'Switch-gaming', 
      menus: JSON.parse(JSON.stringify(process.env.MENUS)).split(','),

    });
});

module.exports = router_login;