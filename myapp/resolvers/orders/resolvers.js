const { PrismaClient } = require('@prisma/client')

const bcrypt = require('bcrypt') 

const jwt = require('jsonwebtoken')
 
//const { APP_SECRET } = require('../jwt/utils')

const prisma = new PrismaClient()

const resolvers = {
    
    products: async () => {

        const product = await prisma.produit.findMany();
    
        return product;
    
      }, 
    

}

module.exports = resolvers;