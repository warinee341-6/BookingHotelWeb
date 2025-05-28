const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const register = async (name, email, password, phone,role) => {
    return await prisma.users.create({
        data: {
            name,
            email,
            password,
            phone,
            role
        }
    })
}

const login = async(email) => {
    return await prisma.users.findUnique({
        where: {email}
    })
}

const deleteUser = async(id) => {
    return await prisma.users.delete({
        where: {id: parseInt(id)}
    })
}



module.exports = { register, login , deleteUser}