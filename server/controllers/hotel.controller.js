const hotelService = require('../services/hotel.service')

const getHotels = async (request, h) => {
    try {
        const hotels = await hotelService.getAllHotels()
        return h.response(hotels).code(200)
    } catch (err) {
        return h.response({error: 'Failed to fetch hotels'}).code(500)
    }
}

const getHotelById = async(request, h) => {
    try {
        const id = request.params.id
        const hotel = await hotelService.getHotelById(id)
        if(!hotel) return h.response("No hotels found").code(404)
        return h.response(hotel).code(200)
    } catch (error) {
        console.error('Create hotel error:', error)
        return h.response({error: 'Failed to fetch hotels'}).code(500)
    }
}

const createHotel = async (request, h) => {
    try {
        const {name,address,description,city,region,user_id} = request.payload
        const user = request.auth.credentials
        if(user.role!="ADMIN" && user.role!="OWNER"){
            return h.response({ error: 'Access denied: Only admin and owner can add hotels' }).code(403)
        }
        const hotel = await hotelService.createHotel({
            name,
            address,
            description,
            city,
            region,
            user_id: user.userId
        })

        return h.response(hotel).code(201)
    } catch (error) {
        console.error('Create hotel error:', error)
        return h.response({error: 'Failed to create hotels'}).code(500)
    }
}

const updateHotel = async(request, h)=>{
    try {
        const id = request.params.id
        const data = request.payload
        const user = request.auth.credentials
        const hotel = await hotelService.getHotelById(id)
        if(user.role!="ADMIN" && hotel.user_id != user.userId){
            return h.response({ error: 'Access denied: Only admin and owner can add hotels' }).code(403)
        }
        const updateHotel = await hotelService.updateHotel(id,data)
        return h.response(updateHotel).code(200)
    } catch (error) {
        console.error('Create hotel error:', error)
        return h.response({error: 'Failed to update hotels'}).code(500)
    }
}

const deleteHotel = async(request, h) => {
    try {
        const id = request.params.id
        await hotelService.deleteHotel(id)
        return h.response("Delete Successfully!").code(200)
    } catch (error) {
        console.error('Create hotel error:', error)
        return h.response({error: 'Failed to delete hotels'}).code(500)
    }
}

const searchHotel = async (request, h) => {
    try {
        const payload = request.payload || {}; // รับ payload มาเป็น object
        console.log('Received payload in searchHotel:', payload); // Log payload ฉบับเต็ม
        const query = payload.query || ''; // ดึง query โดยตรงจาก payload
        const hotels = await hotelService.searchHotel(query);
        console.log('Search results from Prisma:', hotels); // Log ผลลัพธ์จาก Prisma
        return h.response({ hotels }).code(200);
    } catch (error) {
        console.error('Search hotel error:', error);
        return h.response({ error: 'Failed to search hotels' }).code(500);
    }
}

module.exports = { getHotels , getHotelById, createHotel , updateHotel, deleteHotel, searchHotel}