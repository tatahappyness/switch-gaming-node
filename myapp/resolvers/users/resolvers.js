const { PrismaClient } = require('@prisma/client')

const bcrypt = require('bcrypt') 

const jwt = require('jsonwebtoken')
 
//const { APP_SECRET } = require('../jwt/utils')

const prisma = new PrismaClient()

const resolvers = {
    
    users: async () => {

        const users = await prisma.user.findMany();
    
        return users;
    
      }, 
    

}

module.exports = resolvers;