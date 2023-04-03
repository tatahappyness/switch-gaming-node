const { PrismaClient } = require('@prisma/client')


const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const { APP_SECRET } = require('../jwt/utils')



const prisma = new PrismaClient()

 

// Provide resolver functions for your schema fields



const resolvers = {

	// 1

	login: async (args) => {

    const user = await prisma.user.findUnique({ where: { email: args.email } });

	 if (!user) {

		//throw new Error('No such user found')

		return {

			message: 'No such user found'

		  }

	  }



	  // 2

	  const valid = await bcrypt.compare(args.passwd, user.passwd)

	  if (!valid) {

		//throw new Error('Invalid password')

		return {

			message: 'Invalid password'

		  }

	  }



	  const token = jwt.sign({ user: user }, APP_SECRET, { expiresIn: '30m' })



	  // 3

	  return {

		token,

		user

		

	  }



  },

	

  users: async () => {

    const users = await prisma.user.findMany();

	return users;

  },

  user: async (args) => {

    const user = await prisma.user.findUnique({where: {id: parseInt(args.id)}, include: {portofolios: true}});

	return user;

  },

 updateUser: async (args) => {

	const updateUser = await prisma.user.update({

		where: {id: parseInt(args.id)},

		data: args.user,

	});

	return updateUser;

 },

 createUser: async (args) => {

	const newUser = await prisma.user.create({

		data: args.user,

		});

		return newUser;

 },

 deleteUser: async (args) => {

	const deleteUser = await prisma.user.delete({

	  where: {id: parseInt(args.id)},

	});

	return deleteUser;

 },

 

 //PORTOFOLIO CRUD

 portofolios: async (args) => {

    const portofolios = await prisma.portofolio.findMany({include: {category: true}});

	return portofolios;

  },

  portofolio: async (args) => {

    const portofolio = await prisma.portofolio.findUnique({where: {id: parseInt(args.id)}, include: {user: true, category: true}});

	return portofolio;

  },

 updatePortofolio: async (args) => {

	const {title, text, imgAlaUne, type, adviceTitle, adviceContent} = args.portofolio;
	const imgs = JSON.stringify(args.portofolio.imgGalery);

	const updatePortofolio = await prisma.portofolio.update({

		where: {id: parseInt(args.id)},

		data:{

			title: title, text: text, imgAlaUne: imgAlaUne,

			imgGalery: imgs,

			type: type, adviceTitle: adviceTitle, 

			adviceContent: adviceContent

			//categoryId: parseInt(categoryId)

		},

	});

	return updatePortofolio;

 },

 createPortofolio: async (args) => {

	 const {title, text, imgAlaUne, authorId, type, adviceTitle, adviceContent, categoryId} = args.portofolio;
	 const imgs = JSON.stringify(args.portofolio.imgGalery);
		
	const newPortofolio = await prisma.portofolio.create({

		data: {

			title: title, text: text, imgAlaUne: imgAlaUne,

			authorId: parseInt(authorId),

			imgGalery: imgs,

			type: type, adviceTitle: adviceTitle, 

			adviceContent: adviceContent,

			categoryId: parseInt(categoryId)

		},

	});

	return newPortofolio;

 },

 deletePortofolio: async (args) => {

	const deletePortofolio = await prisma.portofolio.delete({

	  where: {id: parseInt(args.id)},

	});

	return deletePortofolio;

 },

 portofoliosByCategoryAndType: async (args) => {

    const portofolios = await prisma.portofolio.findMany({

		where: { categoryId: { 

					equals: parseInt(args.category) 
				}

		}

	

	});

	return portofolios;

  },

  portfoliosByPagination: async (args) => {

	var offset = 0

	const limit = 2

	if(parseInt(args.page) > 1) {

		offset = limit * (parseInt(args.page) - 1)

	}

	const id = parseInt(args.portofolioId)

	

    const portfoliosByPagination = await prisma.$queryRaw

		`

			SELECT id, title, imgAlaUne, categoryId, type 

			FROM portofolio 

			LIMIT ${limit} OFFSET ${offset} 

		` 

	return portfoliosByPagination;

  },

 

 //VISITOR CRUD

 visitors: async () => {

    const visitors = await prisma.visitor.findMany();

	return visitors;

  },

  visitor: async (args) => {

    const visitor = await prisma.visitor.findUnique({where: {id: parseInt(args.id)}});

	return visitor;

  },

 createOrUpdateVisitor: async (args) => {

		const {platform, language, mobile, agent, ip} = args.visitor;

		const newOrUdateVisitor = await prisma.visitor.upsert({

		  where: {

			ip: ip,

		  },

		  update: {platform: platform, language: language, mobile: mobile, agent: agent},

		  create: args.visitor,

		})

		

		return newOrUdateVisitor;

 },

 deleteVisitor: async () => {

	const deleteVisitors = await prisma.visitor.deleteMany({});

	return deleteVisitors;

 },

 visitorsCount: async () => {

    const visitorCount = await prisma.visitor.count();

	return visitorCount;

  },

  visitorsGroupByDate: async () => {

    const visitorsGroupCountByDate = await prisma.$queryRaw

		`

			SELECT createdAt, COUNT(createdAt) AS count 

			FROM visitor

			GROUP BY createdAt 

			ORDER BY createdAt ASC

		`

	return visitorsGroupCountByDate;

  },

 

 //CRUD CATEGORY

 createOrUpdateCategory: async (args) => {

		const {name, description, id} = args.category;

		const newOrUdateCategory = await prisma.category.upsert({

		  where: {

			id: parseInt(id),

		  },

		  update: {name: name, description: description},

		  create: {name: name, description: description},

		})

		

		return newOrUdateCategory;

 },

 deleteCategory: async (args) => {

	const deleteCategory = await prisma.category.delete({

	  where: {id: parseInt(args.id)},

	});

	return deleteCategory;

 },

 categories: async (args) => {

    const categories = await prisma.category.findMany();

	return categories;

  },

  category: async (args) => {

    const category = await prisma.category.findUnique({where: {id: parseInt(args.id)}, include: {portofolios: true}});

	return category;

  },

 

 

};



module.exports = resolvers;