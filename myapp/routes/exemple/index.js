var Twig = require("twig")

const express = require('express')

const path = require('path')

const router_index = express.Router()



const { request, gql } = require("graphql-request")

require('dotenv').config()

const requestIp = require('request-ip');

const nodemailer = require('nodemailer')



const date = require('date-and-time')

require('dotenv').config()

const transporter = nodemailer.createTransport({

	  service: 'gmail',

	  pool: true,	

	  host: process.env.EMAIL_HOST,

	  port: process.env.EMAIL_PORT,

	  secure: true, // use TLS //SSL

	  auth: {

		user: process.env.EMAIL_USER,

		pass: process.env.EMAIL_PASSWORD

	  },

	  tls: {

		// do not fail on invalid certs

		rejectUnauthorized: false,

	  },

})



var title = '2azpeinture';



//Routers

router_index.get('/', (req, res) => {

	

	const clientIp = requestIp.getClientIp(req);

	const my_func_async = async (clientIp) => {

		const query_visitor = gql`

		  mutation {

			  createOrUpdateVisitor(visitor: {

				ip: ${JSON.stringify(clientIp)}

			  }) {

				id

			  }

			}

		`

		

		const query_category= gql`

		  query {

			  categories {

				id

				name

				description

				createdAt

			  }

			}

		`

		

		const query_portos = gql`

		  query {

				portofolios {

					id

					title

					text

					type

					adviceTitle

					adviceContent

					categoryId

					imgAlaUne

					imgGalery

					createdAt

				}

			}

		`

		

		const result_visitor = await request(process.env.SERVER_URL, query_visitor)

		//console.log(result_visitor.createOrUpdateVisitor)

		const result_portos = await request(process.env.SERVER_URL, query_portos)

		//console.log('Befor: ' + JSON.stringify(result_portos.portofolios))

		const result_category = await request(process.env.SERVER_URL, query_category)

		//console.log(result_category.categories)

		

		var portofolios = new Array()

		result_portos.portofolios.forEach((portofolio) => {

			portofolio.createdAt = date.format((new Date(Date.parse(portofolio.createdAt))),'YYYY/MM/DD HH:mm:ss')

			portofolios.push(portofolio)

		})

		//console.log('After: ' + JSON.stringify(portofolios))

		

		res.render('front/home.twig', {

		  title : title,

		  url: req.headers.host,

		  categs: result_category.categories,

		  portos: portofolios

	   })

	}

	my_func_async(clientIp).catch((error) => console.log(error))

	

})


router_index.get('/peinture/:id/:name', (req, res) => {

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

		

		const query_portos = gql`

		  query {

				portofolios {

					id

					title

					text

					type

					adviceTitle

					adviceContent

					categoryId

					imgAlaUne

					imgGalery

					createdAt

				}

			}

		`

	

		const result_portos = await request(process.env.SERVER_URL, query_portos)

		//console.log('Befor: ' + JSON.stringify(result_portos.portofolios))

		//console.log(query);

		const result = await request(process.env.SERVER_URL, query)

		//console.log(result.categories)
		
		switch(parseInt(req.params.id)) {
		  case 1:
			res.render('front/comment-choisir-ma-peinture.twig', {

				title : title,

				url: req.headers.host,

				categs: result.categories,

				portos: result_portos.portofolios

			})
			
			break;
		  case 2:
			res.render('front/dans-mon-interieur.twig', {

				title : title,

				url: req.headers.host,

				categs: result.categories,

				portos: result_portos.portofolios

			})

			break;
		  case 3:
			res.render('front/sur-ma-façade-exterieure.twig', {

				title : title,

				url: req.headers.host,

				categs: result.categories,

				portos: result_portos.portofolios

			})
			
			break;
		  default:
			res.redirect('/');
			
		}

	}

	my_func_async().catch((error) => console.log(error))



})

router_index.get('/ravalement-de-facade/:id/:name', (req, res) => {

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

		const query_portos = gql`

		  query {

				portofolios {

					id

					title

					text

					type

					adviceTitle

					adviceContent

					categoryId

					imgAlaUne

					imgGalery

					createdAt

				}

			}

		`

		const result_portos = await request(process.env.SERVER_URL, query_portos)

		//console.log('Befor: ' + JSON.stringify(result_portos.portofolios))

		//console.log(query);

		const result = await request(process.env.SERVER_URL, query)

		//console.log(result.categories)
		
		switch(parseInt(req.params.id)) {
		  case 1:
			res.render('front/ravalement-de-facade.twig', {

				title : title,

				url: req.headers.host,

				categs: result.categories,

				portos: result_portos.portofolios

			})
			
			break;
		  default:
			res.redirect('/');
			
		}

	}

	my_func_async().catch((error) => console.log(error))

})

router_index.get('/optimiser-son-espace/:id/:name', (req, res) => {

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

		const query_portos = gql`

		  query {

				portofolios {

					id

					title

					text

					type

					adviceTitle

					adviceContent

					categoryId

					imgAlaUne

					imgGalery

					createdAt

				}

			}

		`

		const result_portos = await request(process.env.SERVER_URL, query_portos)

		//console.log('Befor: ' + JSON.stringify(result_portos.portofolios))

		//console.log(query);

		const result = await request(process.env.SERVER_URL, query)

		//console.log(result.categories)
		
		switch(parseInt(req.params.id)) {
		  case 1:
			res.render('front/jamenage-ma-cuisine.twig', {

				title : title,

				url: req.headers.host,

				categs: result.categories,

				portos: result_portos.portofolios

			})
			
			break;
		  case 2:
			res.render('front/jamenage-ma-salle-de-bain.twig', {

				title : title,

				url: req.headers.host,

				categs: result.categories,

				portos: result_portos.portofolios

			})

			break;
		  default:
			res.redirect('/');
				
		}

	}

	my_func_async().catch((error) => console.log(error))

})

router_index.get('/revetement-sol-au-plafond/:id/:name', (req, res) => {

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

		const query_portos = gql`

		  query {

				portofolios {

					id

					title

					text

					type

					adviceTitle

					adviceContent

					categoryId

					imgAlaUne

					imgGalery

					createdAt

				}

			}

		`

		const result_portos = await request(process.env.SERVER_URL, query_portos)

		//console.log('Befor: ' + JSON.stringify(result_portos.portofolios))

		//console.log(query);

		const result = await request(process.env.SERVER_URL, query)

		//console.log(result.categories)
		
		switch(parseInt(req.params.id)) {
		  case 1:
			res.render('front/revetements-de-sols.twig', {

				title : title,

				url: req.headers.host,

				categs: result.categories,

				portos: result_portos.portofolios

			})
			
			break;
		  case 2:
			res.render('front/revetements-de-murs.twig', {

				title : title,

				url: req.headers.host,

				categs: result.categories,

				portos: result_portos.portofolios

			})

			break;
		  default:
			res.redirect('/');
				
		}

	}

	my_func_async().catch((error) => console.log(error))

})


router_index.get('/contact', (req, res) => {

	

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

		

		res.render('front/contact.twig', {

			title : title,

			url: req.headers.host,

			categs: result.categories

		})

	}

	my_func_async().catch((error) => console.log(error))



})



router_index.get('/realisations/:categId/:type/:categName', (req, res) => {

	

	const my_func_async = async (req) => {

		

		const query_category= gql`

		  query {

			  categories {

				id

				name

				description

				createdAt

			  }

			}

		`

		
		const query_portos = gql`

		  query {

				portofolios {

					id

					title

					text

					type

					adviceTitle

					adviceContent

					categoryId

					category {

						name

						description

					}

					imgAlaUne

					imgGalery

					createdAt

				}

			}

		`

		

		const result_portos = await request(process.env.SERVER_URL, query_portos)

		//console.log('Befor: ' + JSON.stringify(result_portos.portofoliosByCategoryAndType))

		const result_category = await request(process.env.SERVER_URL, query_category)

		//console.log(result_category.categories)

		

		var portofolios = new Array()

		result_portos.portofolios.forEach((portofolio) => {

			portofolio.createdAt = date.format((new Date(Date.parse(portofolio.createdAt))),'YYYY/MM/DD HH:mm:ss')

			portofolios.push(portofolio)

		})

		//console.log('After: ' + JSON.stringify(portofolios))

		

			res.render('front/realizes.twig', {

			title : title,

			url: req.headers.host,

			categs: result_category.categories,

			portos: portofolios

		})

	}

	my_func_async(req).catch((error) => console.log(error))



})



router_index.get('/realisation/:realizeId/:realizeName/:categId?/:type?/:page?', (req, res) => {

	

	const my_func_async = async (req) => { 

			

			const query_category= gql`

		  query {

			  categories {

				id

				name

				description

				createdAt

			  }

			}

		`

		

		const query_gallery = gql`

		  query {

				portofolio(id: ${req.params.realizeId}) {

					id

					title

					text

					adviceTitle

					adviceContent

					imgGalery

				}

			}

		`

		

		const query_portos_pagination = gql`

		  query {

				portfoliosByPagination(page: ${req.params.page}) {

					id

					title

					imgAlaUne

					categoryId

					type

				}

			}

		`


		//Pagination peer page

		const result_pagination_portos = await request(process.env.SERVER_URL, query_portos_pagination)

		//console.log(JSON.stringify(result_pagination_portos.portfoliosByPagination))

		const result_galleries = await request(process.env.SERVER_URL, query_gallery)

		//console.log('Befor: ' + JSON.stringify(result_galleries.portofolio))
		
		//This data String Convert to JSON here
		result_galleries.portofolio.imgGalery = JSON.parse(result_galleries.portofolio.imgGalery)

		const result_category = await request(process.env.SERVER_URL, query_category)

		//console.log(result_category.categories)

			

			res.render('front/realize-detail.twig', {

			title : title,

			url: req.headers.host,

			categs: result_category.categories,

			gallers: result_galleries.portofolio,

			pages: result_pagination_portos.portfoliosByPagination,

			curentPage: parseInt(req.params.page)

		})

	

	}

	my_func_async(req).catch((error) => console.log(error))

  

})



//Send Email

router_index.post('/send-mail/:nameAction', (req, res) => {

  

	switch(req.params.nameAction) {

		case "devis":

		

			// verify connection configuration

			transporter.verify(function (error, success) {

			  if (error) {

				console.log(error);

			  } else {

				console.log("Server is ready to take our messages");

			  }

			})

			

			const mailOptions = {

			  from: process.env.EMAIL_USER,

			  to: ['azoumjaouad@hotmail.fr', 'florent.tata91@gmail.com'],

			  subject: JSON.stringify(req.body.subject),

			  html: '<h4>' + JSON.stringify("Un nouveaux messages d\'un client!")+ ' </h4><h5>Bonjour! </h5><p><strong>Nom:</strong> ' + req.body.first_name + '</p>' 

			  + '<p><strong>Prénoms: </strong>' + req.body.last_name + '</p>'

			  + '<p><strong>Email: </strong>' + req.body.email + '</p>'

			  + '<p><strong>Message: </strong><br>' + JSON.stringify(req.body.messsage) + '</p>',

			  headers: {

					'x-my-key': 'Peintre.fr'

				}

			}

			

			transporter.sendMail(mailOptions, function(error, info){

			  if (error) {

				console.log(error);

			  } else {

				console.log('Email sent: ' + info.response);

				res.json({info: 'Votre demande est bien réçu!!'})

			  }

			})

			break;

			

		case "newsletter":

			

			// verify connection configuration

			transporter.verify(function (error, success) {

			  if (error) {

				console.log(error);

			  } else {

				console.log("Server is ready to take our messages");

			  }

			})

			

			const mailOptionsNews = {

			  from: process.env.EMAIL_USER,

			  to: ['azoumjaouad@hotmail.fr', 'florent.tata91@gmail.com'],

			  subject: JSON.stringify("Vous avez reçu un adresse email d\'un client - News letter"),

			  html: '<h4>' + JSON.stringify("Un nouveaux messages d\'un client!")+ ' </h4><h3>Bonjour! </h3>'

			  + '<p><strong>Email: </strong>' + req.body.email + '</p>',

			  headers: {

					'x-my-key': 'Peintre.fr'

				}

			}

			

			transporter.sendMail(mailOptionsNews, function(error, info){

			  if (error) {

				console.log(error);

			  } else {

				console.log('Email sent: ' + info.response);

				res.json({info: "Votre addresse mail est bien réçu, vous reçevrez nos newletters, Merci!!"})

			  }

			})

			break;

		default:

			return false;

	

	}

})



module.exports = router_index