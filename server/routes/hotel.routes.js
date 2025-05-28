const hotelController = require('../controllers/hotel.controller')

module.exports = [
    {
        method: 'GET',
        path: '/hotels',
        options: {
            auth: 'jwt',
            handler: hotelController.getHotels
        }
    },
    {
        method: 'GET',
        path: '/hotels/{id}',
        options: {
            auth: 'jwt',
            handler: hotelController.getHotelById
        }
    },
    {
        method: 'POST',
        path: '/hotels',
        options: {
            auth: 'jwt',
            handler: hotelController.createHotel
        }
    },
    {
        method: 'PUT',
        path: '/hotels/{id}',
        options: {
            auth: 'jwt',
            handler: hotelController.updateHotel
        }
    },
    {
        method: 'DELETE',
        path: '/hotels/{id}',
        options: {
            auth: 'jwt',
            handler: hotelController.deleteHotel
        }
    },
    {
        method: 'POST',
        path: '/hotels/search',
        options: {
            handler: hotelController.searchHotel
        }
    }
]