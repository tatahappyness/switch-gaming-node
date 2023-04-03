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

		imgGalery: [Json]

		adviceTitle: String

		adviceContent: String

		authorId: ID

		categoryId: ID

	}

`)

module.exports = schema;