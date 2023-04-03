const express = require('express');
const router_api = express.Router(); 

/* GET users listing. */
router_api.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router_api;
