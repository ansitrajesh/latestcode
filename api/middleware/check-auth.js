const jwt = require('jsonwebtoken');
const { jwt: { jwtKey: key } } = require('../../config/config.json');
const { BaseResponse } = require('../../utils/response');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop().trim();
        const decoded = jwt.verify(token, key);
        req.userInfo = decoded;
        next();
    } catch (error) {
        return res.status(401).json(BaseResponse.sendError('Unauthorized'));
    }
};