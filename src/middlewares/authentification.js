const jwt = require('jsonwebtoken')
const USER = require('../models/modelusers')

const authentification = async(req, res, next) => {
    try {
        const authToken = req.header('Authorization').replace('Bearer ', '');
        const decoToken = jwt.verify(authToken, 'foo');
        const user = await USER.findOne({ _id: decoToken._id, 'authTokens.authToken': authToken });

        if(!user) throw new Error('User foundnt');

        req.authToken = authToken
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send(e)
    }
}

module.exports = authentification;