const { graphqlHTTP, getGraphQLParams } = require('express-graphql');

const user_schema = require('../schema/users/schema');

const user_resolvers = require('../resolvers/users/resolvers');

const userResolvers = graphqlHTTP(async (request, response, graphQLParams) => ({

    schema: user_schema,

    rootValue: await user_resolvers,

    graphiql: true,

}))



module.exports =  userResolvers