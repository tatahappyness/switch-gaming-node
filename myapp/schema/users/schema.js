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

        fullname: String

		role: String

        username: String
        
        email: String

        passwd:String

    }

    type User {

		id: ID!
		
		username: String

        fullname: String

		email: String

		passwd:String

		role: String

		produit : [Produit]

	}

    type Produit {

		id: ID!

		title: String

		text: String

		imgAlaUne: String
		
		imgGalery: String	

		priceNew: String

        priceOld: String

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

		produit: [Produit]

	}

    type Mutation {

        login(email: String!, passwd: String!): AuthPayload

        createUser(user: UserInput): User

        updateUser(id: ID!, user: UserInput): User

		deleteUser(id: ID!): User
    
    }

    type Query {

		users: [User!]

		user(id: ID!): User
    }

`)

module.exports = schema;