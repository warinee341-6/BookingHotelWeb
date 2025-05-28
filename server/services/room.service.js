const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getRooms = async() =>{
    return await prisma.room.findMany()
}

const createRoom = async({name,status,price,type,description,hotel_id}) => {
    return await prisma.room.create({
        data: {
            name,
            status,
            price,
            type,
            description,
            hotel_id
        }
    })
}

const updateRoom = async(id, inputData) => {
    return await prisma.room.update({
        where: {id: parseInt(id)},
        data: inputData
    })
}

const deleteRoom = async(id) => {
    return await prisma.room.delete({
        where: {id: parseInt(id)}
    })
}

module.exports = { getRooms, createRoom, updateRoom, deleteRoom}