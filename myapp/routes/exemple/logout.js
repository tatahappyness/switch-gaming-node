const express = require("express");
const router_logout = express.Router();

const jwt = require('jsonwebtoken')
const { APP_SECRET,  } = require('../jwt/utils')

router_logout.get('/', (req, res) => { 
	
	req.session.destroy(null);
	res.clearCookie(this.cookie, { path: '/' });
	
	jwt.sign({ userId: null }, APP_SECRET, { expiresIn: 1 });
	
	return res.redirect('/login');
	
	
 })

module.exports = router_logout
