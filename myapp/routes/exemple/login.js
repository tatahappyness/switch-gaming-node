const express = require("express")

const router_login = express.Router()



const { request, gql } = require("graphql-request")

require('dotenv').config()

var title = '2azpeinture';



router_login.get('/', (req, res) => {

	

	const my_func_async = async () => {

				

		const query = gql`

		  query {

			  categories {

				id

				name

				description

				createdAt

			  }

			}

		`

		//console.log(query);

		const result = await request(process.env.SERVER_URL, query)

		//console.log(result.categories)

		

		res.render('front/login.twig', {

			title : title,

			url: req.headers.host,

			categs: result.categories

		})

	}

	my_func_async().catch((error) => console.log(error))

	

})



router_login.post('/auth', (req, res) => {

	

	const connexion = async (req) => { 

	

		const query = gql`

		  mutation {

			  login(email: "${req.body.email}", passwd: "${req.body.passwd}") {

				token

				message

				user {

					id

					name

					email

					role

				}

			  }

			}

		`

		const authenticated = await request(process.env.SERVER_URL, query)

		console.log(JSON.stringify(authenticated.login.token, undefined, 2))

		

		if(authenticated.login.user == null){

			return res.redirect('/logout')

		}

		//Passing token in request session

		req.session.token = authenticated.login.token;

		

		switch(authenticated.login.user.role) {

		  case "ADMIN":

			return res.redirect('/admin/dashbord')

			break;

		  case "SUBSCRIBER":

			return res.redirect('/member')

			break;

		  default:

			return res.redirect('/logout')

		}

	}

	connexion(req).catch((error) => console.log(error))

})



module.exports = router_login