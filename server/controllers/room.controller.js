const roomService = require('../services/room.service')

const getAllRooms = async(request, h) => {
    try {
        const hotels = await roomService.getRooms()
        return h.response(hotels).code(200)
    } catch (error) {
        return h.response({error: 'Failed to fetch rooms'}).code(500)
    }
}

const createRoom = async(request,h) => {
    try {
        const {name, status,price,type,description, hotel_id} = request.payload
        const room = await roomService.createRoom({
                name,
                status,
                price,
                type,
                description,
                hotel_id
        })
        return h.response(room).code(201)
    } catch (error) {
        console.error('Create Room Error:', error);
        return h.response({error: 'Failed to create rooms'}).code(500)
    }
}

const updateRoom = async(request,h) => {
    try {
        const id = request.params.id
        const data = request.payload
        const updateRoom = await roomService.updateRoom(id,data)
        return h.response(updateRoom).code(200)
    } catch (error) {
        return h.response({error: 'Failed to update rooms'}).code(500)
    }
}

const deleteRoom = async(request,h) => {
    try {
        const id = request.params.id
        await roomService.deleteRoom(id)
        return h.response("Delete Successfully!").code(200)
    } catch (error) {
        return h.response({error: 'Failed to delete rooms'}).code(500)
    }
}


module.exports = { getAllRooms, createRoom, updateRoom, deleteRoom }