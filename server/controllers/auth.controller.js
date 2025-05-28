const authService = require('../services/auth.service')
const bcrypt = require('bcrypt')
const jwt = require('@hapi/jwt');

const register = async(request, h) => {
    try {
        const {name,email,password,phone,role} = request.payload
        const hashPassword = await bcrypt.hash(password,10)
        const user = await authService.register(name, email, hashPassword, phone,role)
        return h.response(user).code(201)
    } catch (error) {
        console.error('Create user error:', error)
        return h.response({error: 'Failed to create user'}).code(500)
    }
}

const login = async (request, h) => {
    try {
        const { email, password } = request.payload;
        const user = await authService.login(email);

        if (!user) {
            return h.response({ error: 'Invalid email or password' }).code(401);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return h.response({ error: 'Invalid email or password' }).code(401);
        }

        const token = jwt.token.generate(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4
            },
            {
                key: process.env.JWT_SECRET_KEY,
                algorithm: 'HS256'
            }
        );

        return h.response({ message: 'Login successful', token, userId: user.id, role: user.role }).code(200);

    } catch (error) {
        console.error('Login error:', error);
        return h.response({ error: 'Failed to login' }).code(500);
    }
}


const deleteUser = async(request, h) => {
    try {
        const id = request.params.id
        await authService.deleteUser(id)
        return h.response("Delete Successfully!").code(200)
    } catch (error) {
        console.error('Login error:', error)
        return h.response({error: 'Failed to login'}).code(500)
    }
}

const verify = async (request, h) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return h.response({ error: 'No token provided' }).code(401);
        }

        const token = authHeader.replace('Bearer ', '');

        const decoded = jwt.token.decode(token);
        const verified = jwt.token.verify(decoded, {
            key: process.env.JWT_SECRET_KEY,
            algorithm: 'HS256',
        });

        return h.response({
            message: 'Token valid',
            userId: decoded.decoded.payload.userId,
            role: decoded.decoded.payload.role,
        }).code(200);
    } catch (error) {
        console.error('Verify error:', error);
        return h.response({ error: 'Invalid or expired token' }).code(401);
    }
};

module.exports = {register,login, deleteUser,verify}