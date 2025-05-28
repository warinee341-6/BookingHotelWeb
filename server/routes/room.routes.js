const roomController = require('../controllers/room.controller')

module.exports = [
    {
        method: 'GET',
        path: '/rooms',
        options: {
            auth: 'jwt',
            handler: roomController.getAllRooms
        }
    },
    {
        method: 'POST',
        path: '/rooms',
        options: {
            
            handler: roomController.createRoom
        }
    },
    {
        method: 'PUT',
        path: '/rooms/{id}',
        options: {
            
            handler: roomController.updateRoom
        }
    },
    {
        method: 'DELETE',
        path: '/rooms/{id}',
        options: {
            
            handler: roomController.deleteRoom
        }
    }
]