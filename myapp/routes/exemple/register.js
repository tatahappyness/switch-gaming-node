const express = require("express")

const router_register = express.Router()



const { request, gql, GraphQLClient } = require("graphql-request")



const bcrypt = require('bcrypt')

require('dotenv').config()

var title = '2azpeinture';



var url = require('url')



//Routers

router_register.get('/', (req, res) => {



	const pwd = "admin@1234";

	

	const result = async (pd) => {

			console.log(pd);

			const passwd = await bcrypt.hash(pd, 10)

			

			const query = gql`

			  mutation {

				  createUser(user: {name: "admin", email: "admin@gmail.com", passwd: "${passwd}"}) {

					id

				  }

				}

			`

		

			const data = await request(process.env.SERVER_URL, query)

			console.log(JSON.stringify(data.createUser.id, undefined, 2))

			return res.redirect('/login')

	}

	result(pwd).catch((error) => console.error(error));

	

	// const client = new GraphQLClient(process.env.SERVER_URL, { headers: {}, method: "post"})

	// const result = async () => { 

		// const data = await client.request(query)

		// console.log(JSON.stringify(data.createUser.id, undefined, 2))

		// return res.redirect('/login')

	// }

	// result().catch((error) => console.error(error));

	

})



module.exports = router_register