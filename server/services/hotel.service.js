const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllHotels = async () => {
    return await prisma.hotel.findMany()
}

const getHotelById = async(id) => {
    return await prisma.hotel.findUnique({
        where: {id: parseInt(id)}
    })
}

const createHotel = async ({name,address,description,city,region,user_id}) => {
    return await prisma.hotel.create({
        data: {
            name,
            address,
            description,
            city,
            region,
            user_id,
        }
    })
}

const updateHotel = async(id, updateData) => {
    return await prisma.hotel.update({
        where: {id: parseInt(id)},
        data: updateData
    })
}

const deleteHotel = async(id) => {
    return await prisma.hotel.delete({
        where: {id: parseInt(id)}
    })
}

const searchHotel = async (data) => {
    if (!data || data.trim() === '') {
        // ถ้าไม่มี query ให้คืนโรงแรมทั้งหมด
        return await prisma.hotel.findMany({
            include: { rooms: true },
        });
    }

    return await prisma.hotel.findMany({
        where: {
            OR: [
                { name: { contains: data.trim(), mode: 'insensitive' } },
                { city: { contains: data.trim(), mode: 'insensitive' } },
                { address: { contains: data.trim(), mode: 'insensitive' } },
            ],
        },
        include: {
            rooms: true,
        },
    });
}

module.exports = {getAllHotels, getHotelById, createHotel, updateHotel, deleteHotel, searchHotel}