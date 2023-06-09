const express = require('express');
const router_register = express.Router(); 

const { request, gql } = require("graphql-request")

const bcrypt = require('bcrypt')

require('dotenv').config()

//To create user
router_register.post('/create/:type_user?', function(req, res, next) {
    
    const result = async (req) => {
        
        const passwd = await bcrypt.hash(req.body.password, 10)
        let role = ''

        if(req.params.type_user == 'admin')
        {
             role = 'ADMIN'
        }
        else
        {
            role = 'USER'
        }

        const query = gql`

			  mutation {

				  createUser(user: {role: "${role}", username: "${req.body.username}", fullname: "${req.body.fullname}", email: "${req.body.email}", passwd: "${passwd}"}) {

					id

				  }

				}

			`

        const data = await request(process.env.SERVER_URL + '/users', query)

        console.log(JSON.stringify(data.createUser.id, undefined, 2))

        return res.redirect('/login')

    }
    result(req).catch((error) => console.error(error));

});

//To show form register user
router_register.get('/:type_user?', function(req, res, next) {

   const result = async (req) => {

        if(req.params.type_user == 'admin')
        {
            res.render('pages/page-register', 
            { 
            title: 'Switch-gaming', 
            menus: JSON.parse(JSON.stringify(process.env.MENUS)).split(','),

            });
        }
        else
        {
            res.render('pages/page-register', 
            { 
            title: 'Switch-gaming', 
            menus: JSON.parse(JSON.stringify(process.env.MENUS)).split(','),
    
            });

        }

    }
    result(req).catch((error) => console.error(error));

});

module.exports = router_register;