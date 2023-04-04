const { PrismaClient } = require('@prisma/client')

const bcrypt = require('bcrypt') 

const jwt = require('jsonwebtoken')
 
const { APP_SECRET } = require('../../jwt/utils')

const prisma = new PrismaClient()

const resolvers = {

    // 1

      login: async (args) => {

        const user = await prisma.user.findUnique({ where: { email: args.email } });

      if (!user) {

        //throw new Error('No such user found')

        return res.redirect('/logout')

        }


        // 2

        const valid = await bcrypt.compare(args.passwd, user.passwd)

        if (!valid) {

        //throw new Error('Invalid password')

        return res.redirect('/logout')

        }

        const token = jwt.sign({ user: user }, APP_SECRET, { expiresIn: '20m' })

        // 3

        return { token, user }

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

}

module.exports = resolvers;