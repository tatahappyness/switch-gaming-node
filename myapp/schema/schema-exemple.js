const { buildSchema } = require("graphql");



// Construct a schema, using GraphQL schema language

const schema = buildSchema(`

	

	scalar DateTime

	

	type AuthPayload {

	  token: String

	  user: User

	  message: String

	}

	

	 input UserInput {

		name: String

		email: String

		passwd:String

	}

	

	input PortofolioInput {

		title: String	

		text: String

		imgAlaUne: String

		type: String

		imgGalery: [String]

		adviceTitle: String

		adviceContent: String

		authorId: ID

		categoryId: ID

	}

	

	input CategoryInput {

		name: String

		description: String

		id: ID

	}

	

	input VisitorInput {

		ip: String!

		platform: String

		language: String

		mobile: String

		agent: String

	}

	

	type User {

		id: ID!

		name: String

		email: String

		passwd:String

		role: String

		portofolios : [Portofolio]

	}

	

	type Portofolio {

		id: ID!

		title: String

		text: String

		imgAlaUne: String
		
		imgGalery: String	

		type: String

		adviceTitle: String

		adviceContent: String

		createdAt: DateTime

		author: User

		authorId: ID

		category: Category

		categoryId: ID

	}

	

	type Category {

		id: ID

		name: String

		description: String

		createdAt: DateTime

		portofolios: [Portofolio]

	}

	

	type Visitor {

		id: ID

		ip: String

		platform: String

		language: String

		mobile: String

		agent: String

		createdAt: DateTime

		count: Int

	}

	 

	type Mutation {

		

		login(email: String!, passwd: String!): AuthPayload

		

		createUser(user: UserInput): User

		updateUser(id: ID!, user: UserInput): User

		deleteUser(id: ID!): User

		

		createPortofolio(portofolio: PortofolioInput): Portofolio

		updatePortofolio(id: ID!, portofolio: PortofolioInput): Portofolio

		deletePortofolio(id: ID!): Portofolio

		

		createOrUpdateVisitor(visitor: VisitorInput): Visitor

		deleteVisitor: [Visitor]

		

		createOrUpdateCategory(category: CategoryInput): Category

		deleteCategory(id: ID!): Category

		

	}



	type Query {

		users: [User!]

		user(id: ID!): User

		portofolios(user: ID): [Portofolio]

		portofolio(id: ID!): Portofolio

		

		visitors: [Visitor]

		visitor(id: ID!): Visitor

		visitorsCount: Int

	    visitorsGroupByDate: [Visitor]

		

		categories(user: ID): [Category]

		category(id: ID!): Category

		

		portofoliosByCategoryAndType(category: ID, type: String): [Portofolio]

		

		portfoliosByPagination(page: Int): [Portofolio]
		

	}

`);



module.exports = schema;