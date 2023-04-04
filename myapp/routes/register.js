const express = require('express');
const router_register = express.Router(); 

router_register.get('/', function(req, res, next) {
    
  res.render('pages/page-register', 
    { 
      title: 'Switch-gaming', 
      menus: JSON.parse(JSON.stringify(process.env.MENUS)).split(','),

    });
});

module.exports = router_register;