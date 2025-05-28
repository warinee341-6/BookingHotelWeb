const authController = require('../controllers/auth.controller')

module.exports = [
    {
        method: 'POST',
        path: '/auth/register',
        options: {
            handler: authController.register
        }
    },
    {
        method: 'POST',
        path: '/auth/login',
        options: {
            handler: authController.login,
        }
    },
    {
        method: 'DELETE',
        path: '/auth/{id}',
        options: {
            auth: 'jwt',
            handler: authController.deleteUser,
        }
    },
    {
        method: 'GET',
        path: '/auth/verify',
        options: {
            auth: false, 
            handler: authController.verify
        }
    }
]