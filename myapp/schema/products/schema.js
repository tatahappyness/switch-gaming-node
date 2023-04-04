const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language

const schema = buildSchema(`

    scalar DateTime


    input ProduitInput {

		title: String	

		text: String

		imgAlaUne: String

		priceNew: String

        priceOld: String

		ratingNb: String

		ratingLabel: String

		imgGalery: [String]

		adviceTitle: String

		adviceContent: String

		authorId: ID

		categoryId: ID

	}

	type Produit {

		id: ID!

		title: String	

		text: String

		imgAlaUne: String

		priceNew: String

        priceOld: String

		ratingNb: String

		ratingLabel: String

		imgGalery: [String]

		adviceTitle: String

		adviceContent: String

		authorId: ID

		categoryId: ID

	}

	
	type Query {


		products(user: ID): [Produit]

		produit(id: ID!): Produit

		

		productByCategoryAndType(category: ID, type: String): [Produit]

		

		productByPagination(page: Int): [Produit]
		

	}


	type Mutation {

		createProduct(produit: ProduitInput): Produit

		updateProduct(id: ID!, produit: ProduitInput): Produit

		deleteProduct(id: ID!): Produit

	}


`)

module.exports = schema;