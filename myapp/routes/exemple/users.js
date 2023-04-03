var Twig = require("twig");

const express = require('express');

const app = express();

const path = require('path');

const fs = require('fs')

const router_users = express.Router();



const { request, gql } = require("graphql-request")



const date = require('date-and-time')



const { getUser, APP_SECRET } = require('../jwt/utils')

const granted = require('../auth/middleware')



// Begin Upload image require

//const multer  = require('multer')

require('dotenv').config()

var title = '2azpeinture';



//const user = req && req.headers.authorization ? getUser(req): null // use for mobile app auth



//Routers

router_users.get('/dashbord', (req, res) => {

	

	console.log(req.session.token);

	//console.log(req.body);

	//Check token each auth

	const user = getUser(false, req.session.token) //use for web auth

	console.log(user); 

	console.log("AFTER LOGIN");

	

	if(user === null){

		return res.redirect('/logout');

	}

	//check user role

	if(!granted(user, 'ADMIN')) {

		return res.redirect('/logout');

	}

	

	const my_func_async = async () => {

				

		const query = gql`

		  query {

			  visitorsCount

			}

		`

			//console.log(query);

			const result = await request(process.env.SERVER_URL, query)

			console.log(result.visitorsCount)

			

			res.render('back/dashbord.twig', {

				title : title,

				url: req.headers.host,

				count: result.visitorsCount

				

			})

	}

	my_func_async().catch((error) => console.log(error))

	

})



//AJAX GETTING STATISTICS

router_users.get('/ajax/statistics', (req, res) => {

	

	const my_func_async = async () => {

				

		const query = gql`

		  query {

			  visitorsGroupByDate {

				createdAt

				count

			  }

			}

		`

		

		//console.log(query);

		const result = await request(process.env.SERVER_URL, query)

		console.log(result.visitorsGroupByDate)

		

		return res.json(result.visitorsGroupByDate)

	}

	my_func_async().catch((error) => console.log(error))

	

})



//GET PAGE FORMS

router_users.get('/forms/:form_name/:id?', (req, res) => {

	

	console.log(req.session.token);

	//console.log(req.body);

	//Check token each auth

	const user = getUser(false, req.session.token) //use for web auth

	console.log(user); 

	if(user === null){

		return res.redirect('/logout');

	}

	//check user role

	if(!granted(user, 'ADMIN')) {

		return res.redirect('/logout');

	}

	

	switch(req.params.form_name) {

		case "add_portofolio":

			

			const my_func_async = async (user) => {

				

				const query = gql`

				  query {

					  categories(user: ${user.id}) {

						id

						name

						description

						createdAt

					  }

					}

				`

					//console.log(query);

					const result = await request(process.env.SERVER_URL, query)

					console.log(result.categories)

					res.render('back/porto_add.twig', {

					title : title,

					url: req.headers.host,

					categs: result.categories

				})

			}

			my_func_async(user).catch((error) => console.log(error))

			break;

			

		case "add_category":

			

			res.render('back/categ_add.twig', {

				title : title,

				url: req.headers.host

			})

			

			break;

			

		case "edit_portofolio":

			

			 const my_func_async_update_porto = async (req) => {

				const query_porto = gql`

				  query {

					  portofolio(id: ${req.params.id}) {

						id

						title

						text

						imgAlaUne

						type

						imgGalery

						adviceTitle

						adviceContent

						categoryId

					  }

					}

				`

				

				const query_categ = gql`

				  query {

					  categories(user: ${user.id}) {

						id

						name

						description

						createdAt

					  }

					}

				`

				

				//console.log(query);

				const result_porto = await request(process.env.SERVER_URL, query_porto)

				const result_categs = await request(process.env.SERVER_URL, query_categ)

				console.log(result_porto.portofolio)

				

				result_porto.portofolio.imgAlaUne = fs.realpathSync(__dirname + "/", []) + result_porto.portofolio.imgAlaUne;
	
				var realPath = new Array();

				JSON.parse(result_porto.portofolio.imgGalery).forEach((gallery) => {

					realPath.push(fs.realpathSync(__dirname + "/", []) + gallery)

				})   

				result_porto.portofolio.imgGalery = realPath 

				console.log('AFTER: ' + JSON.stringify(result_porto.portofolio))

				

				res.render('back/porto_edit.twig', {

				title : title,

				url: req.headers.host,

				portof: result_porto.portofolio,

				categs: result_categs.categories

				})

			}

			my_func_async_update_porto(req).catch((error) => console.log(error))

			break;

			

		case "edit_category":

		

			const my_func_async_update = async (req) => {

				const query = gql`

				  query {

					  category(id: ${req.params.id}) {

						id

						name

						description

						createdAt

					  }

					}

				`

				//console.log(query);

				const result = await request(process.env.SERVER_URL, query)

				console.log(result.category)

				res.render('back/categ_edit.twig', {

					title : title,

					url: req.headers.host,

					category: result.category

				})

			}

			my_func_async_update(req).catch((error) => console.log(error))

			break;

			

		default:

			return res.redirect('/logout')

	}

	

})



// ShOW LIST POST PAGE

router_users.get('/lists/:post_name', (req, res) => {

	

	console.log(req.session.token);

	//console.log(req.params);

	//Check token each auth

	const user = getUser(false, req.session.token) //use for web auth

	console.log(user);

	console.log("AFTER LISTS");

	

	if(user === null){

		return res.redirect('/logout');

	}

	//check user role

	if(!granted(user, 'ADMIN')) {

		return res.redirect('/logout');

	}

	

	switch(req.params.post_name) {

		case "portofolios":

			

			const my_func_async_list = async (user) => {

				

				const query = gql`

				  query {

						portofolios {

							id

							title

							text

							type

							adviceTitle

							adviceContent

							category {

							  name

							  description

							}

							categoryId

							author {

							  name

							}

							authorId

							imgAlaUne

							imgGalery

							createdAt

						}

					}

				`

					//console.log(query);

					const result = await request(process.env.SERVER_URL, query)

					console.log(result.portofolios)

					res.render('back/list_portofolio.twig', {

					title : title,

					url: req.headers.host,

					portos: result.portofolios

				})

			}

			my_func_async_list(user).catch((error) => console.log(error))

			break;

			

		case "categories":

			

			const my_func_async = async (user) => {

				

				const query = gql`

				  query {

					  categories(user: ${user.id}) {

						id

						name

						description

						createdAt

					  }

					}

				`

				//console.log(query);

				const result = await request(process.env.SERVER_URL, query)

				console.log(result.categories)

				res.render('back/list_category.twig', {

					title : title,

					url: req.headers.host,

					categs: result.categories

				})

			}

			my_func_async(user).catch((error) => console.log(error))

			break;

			

		case "visitors":

			

			const my_func_async_visitors = async () => {

				

				const query = gql`

				  query {

					  visitors {

						  id

						  ip

						  createdAt

					  }

					}

				`

					//console.log(query);

					const result = await request(process.env.SERVER_URL, query)

					console.log(result.visitors)

					

					var visitors = new Array()

					result.visitors.forEach((visitor) => {

						visitor.createdAt = date.format((new Date(Date.parse(visitor.createdAt))),'YYYY/MM/DD HH:mm:ss')

						visitors.push(visitor)

					})

					//console.log('After: ' + JSON.stringify(visitors))

					

					res.render('back/list_visitors.twig', {

						title : title,

						url: req.headers.host,

						visitors: visitors

					})

			}

			my_func_async_visitors().catch((error) => console.log(error))

			break;

			

		default:

			return res.redirect('/logout')

	}

	

	

})



//POST

router_users.post('/add/:post_name', (req, res) => {

	

	console.log(req.session.token);

	//console.log(req.body);

	//Check token each auth

	const user = getUser(false, req.session.token) //use for web auth

	console.log(user); 

	if(user === null){

		return res.redirect('/logout');

	}

	//check user role

	if(!granted(user, 'ADMIN')) {

		return res.redirect('/logout');

	}

	

	switch(req.params.post_name) {

		case "portofolio":

		

			if (!req.files) {

				return res.status(400).send("No files were uploaded.");

			}

			//console.log(JSON.stringify(req.files))

			const avatarFile = req.files.avatar // get the file Single

			const pathAvatar = path.join(__dirname, '../uploads/' + avatarFile.name)

			const nameAvatar = "/uploads/" + avatarFile.name

			avatarFile.mv(pathAvatar, (err) => {

				if (err) {

				 console.log(err);

				}

				console.log(pathAvatar);

			});

			const galleryFiles = req.files.gallery

			var pathGallerys = new Array()

			var pathGallery = ""

			galleryFiles.forEach((galleryFile) => {

				pathGallery = path.join(__dirname, '../uploads/' + galleryFile.name)

				pathGallerys.push("/uploads/" + galleryFile.name)

				galleryFile.mv(pathGallery, (err) => {

				if (err) {

					 console.log(err);

					}

					console.log(pathGallery);

				});

				

			})

			console.log('Gallerys:' + JSON.stringify(pathGallerys))

			

			const my_func_async_upload = async (req, user, nameAvatar, pathGallerys) => {

				const query = gql`

				  mutation {

					  createPortofolio(portofolio: {

						  title: ${JSON.stringify(req.body.porto_title)}, 

						  text: ${JSON.stringify(req.body.porto_text)}, 

						  imgAlaUne: "${nameAvatar}",

						  type: "${req.body.porto_type}", 

						  imgGalery: ${JSON.stringify(pathGallerys)}, 

						  adviceTitle: ${JSON.stringify(req.body.porto_adviceTitle)}, 

						  adviceContent: ${JSON.stringify(req.body.porto_adviceContent)}, 

						  authorId: ${user.id}, 

						  categoryId: ${parseInt(2)}

					  }) {

							id

						  }

					}

				`

				const result = await request(process.env.SERVER_URL, query)

				console.log(result.createPortofolio)

				return res.redirect('/admin/lists/portofolios') 

			}
 
			my_func_async_upload(req, user, nameAvatar, pathGallerys).catch((error) => console.log(error))

			break;

			

		case "category":

		

			const my_func_async = async (req) => {

				const query = gql`

				  mutation {

					  createOrUpdateCategory(category: {

						id: ${req.body.categ_id}, 

						name: "${req.body.categ_title}",

						description: "${req.body.categ_description}"

					  }) {

						id

					  }

					}

				`

				const result = await request(process.env.SERVER_URL, query)

				console.log(result.createOrUpdateCategory)

				return res.redirect('/admin/lists/categories')

			}

			my_func_async(req).catch((error) => console.log(error))

			break;

	

		default:

			return res.redirect('/logout')

	}

	

	

	

})



// PUT

router_users.post('/update/:post_name', (req, res) => {

	

	console.log(req.session.token);

	//console.log(req.body);

	//Check token each auth

	const user = getUser(false, req.session.token) //use for web auth

	console.log(user); 

	if(user === null){

		return res.redirect('/logout');

	}

	//check user role

	if(!granted(user, 'ADMIN')) {

		return res.redirect('/logout');

	}

	

	switch(req.params.post_name) {

		case "portofolio":

			

			if (!req.files) {

				return res.status(400).send("Vous n'avez pas encore séléctionner les images!!");

			}

			//console.log(JSON.stringify(req.files))

			const avatarFile = req.files.avatar // get the file Single

			const pathAvatar = path.join(__dirname, '../uploads/' + avatarFile.name)

			const nameAvatar = "/uploads/" + avatarFile.name

			avatarFile.mv(pathAvatar, (err) => {

				if (err) {

				 console.log(err);

				}

				console.log(pathAvatar);

			});

			const galleryFiles = req.files.gallery

			var pathGallerys = new Array()

			var pathGallery = ""

			galleryFiles.forEach((galleryFile) => {

				pathGallery = path.join(__dirname, '../uploads/' + galleryFile.name)

				pathGallerys.push("/uploads/" + galleryFile.name) 

				galleryFile.mv(pathGallery, (err) => {

				if (err) { 

					 console.log(err);

					}

					console.log(pathGallery);

				});

				

			})

			console.log('Gallerys:' + JSON.stringify(pathGallerys))

			

			const my_func_async_upload_update = async (req, user, nameAvatar, pathGallerys) => {
				//categoryId 
				const query = gql`

				  mutation {
 
					  updatePortofolio(id: ${req.body.porto_id}, portofolio: {

						  title: ${JSON.stringify(req.body.porto_title)}, 

						  text: ${JSON.stringify(req.body.porto_text)}, 

						  imgAlaUne: "${nameAvatar}",

						  type: "${req.body.porto_type}",

						  imgGalery: ${JSON.stringify(pathGallerys)},   

						  adviceTitle: ${JSON.stringify(req.body.porto_adviceTitle)}, 

						  adviceContent: ${JSON.stringify(req.body.porto_adviceContent)}


					  }) {

							id

						  }

					}

				`
 
				const result = await request(process.env.SERVER_URL, query)

				console.log(result.updatePortofolio)

				return res.redirect('/admin/lists/portofolios');

			}

			my_func_async_upload_update(req, user, nameAvatar, pathGallerys).catch((error) => console.log(error))

			break;

		

		default:

			return res.redirect('/logout')

	}

	

	

})



//DELETE

router_users.get('/delete/:post_name/:post_id?', (req, res) => {

	

	console.log(req.session.token);

	//console.log(req.body);

	//Check token each auth

	const user = getUser(false, req.session.token) //use for web auth

	console.log(user); 

	if(user === null){

		return res.redirect('/logout');

	}

	//check user role

	if(!granted(user, 'ADMIN')) {

		return res.redirect('/logout');

	}

	

	switch(req.params.post_name) {

	  case "portofolios":

		const my_func_async_delete_porto = async (req) => {

			const query = gql`

			  mutation {

				  deletePortofolio(id: ${req.params.post_id}) {

					id

				  }

				}

			`

			const result = await request(process.env.SERVER_URL, query)

			console.log(result.deletePortofolio)

			return res.redirect('/admin/lists/portofolios')

		}

		my_func_async_delete_porto(req).catch((error) => console.log(error))

		break;

		

	  case "categories":

		

		const my_func_async = async (req) => {

			const query = gql`

			  mutation {

				  deleteCategory(id: ${req.params.post_id}) {

					id

				  }

				}

			`

			const result = await request(process.env.SERVER_URL, query)

			console.log(result.deleteCategory)

			return res.redirect('/admin/lists/categories')

		}

		my_func_async(req).catch((error) => console.log(error))

		break;

	  case "visitors":

		

		const my_func_async_delete_visitor = async (req) => {

			const query = gql`

			  mutation {

				  deleteVisitor {

					id

				  }

				}

			`

			const result = await request(process.env.SERVER_URL, query)

			console.log(result.deleteVisitor)

			return res.redirect('/admin/lists/visitors')

		}

		my_func_async_delete_visitor(req).catch((error) => console.log(error))

		break;

		

	  default:

		return res.redirect('/logout')

	}

	

})



module.exports = router_users