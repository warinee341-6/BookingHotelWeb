require('dotenv').config();
const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')

//Routes
const hotelRoute = require('./routes/hotel.routes')
const authRoute = require('./routes/auth.routes')
const roomRoute = require('./routes/room.routes')

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['http://localhost:5173']
            }
        }
    })

    await server.register(Jwt);

    server.auth.strategy('jwt', 'jwt', {
        keys: process.env.JWT_SECRET_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400,
            timeSkewSec: 15
        },
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: {
                userId: artifacts.decoded.payload.userId,
                email: artifacts.decoded.payload.email,
                role: artifacts.decoded.payload.role
                }
            }
        }
    });


    server.route([...hotelRoute])
    server.route([...authRoute])
    server.route([...roomRoute])

    await server.start()
    console.log("Server running on port: 3000")
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();