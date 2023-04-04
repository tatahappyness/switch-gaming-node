const { graphqlHTTP, getGraphQLParams } = require('express-graphql');

const user_schema = require('../../schema/users/schema');

const user_resolvers = require('../../resolvers/users/resolvers');

const product_schema = require('../../schema/products/schema');

const product_resolvers = require('../../resolvers/products/resolvers');

const userResolvers = graphqlHTTP(async (request, response, graphQLParams) => ({

    schema: user_schema,

    rootValue: await user_resolvers,

    graphiql: true,

}))

const productResolvers = graphqlHTTP(async (request, response, graphQLParams) => ({

    schema: user_schema,

    rootValue: await product_resolvers,

    graphiql: true,

}))


module.exports =  userResolvers
module.exports =  productResolvers