const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const loginSchema = require('../../models/login.model');
const crypto = require('../../utils/crypto');
const BaseResponse = require('../../utils/response');
const config = require('../../config/config.json');
const checkAuthMiddleWare = require('../middleware/check-auth');

router.post('/', (req, res) => {
    const login = new loginSchema({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        name: req.body.name,
        hashPassword: crypto.encrypt(req.body.password),
        phone: req.body.phone,
        address: req.body.address,
        role: req.body.role
    })
        .save()
        .then((newlogin) => res.json(BaseResponse.sendSuccess('New Login created Successfully')))
        .catch((error) => res.json(BaseResponse.sendError('Error while database Creating...!', error)));
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    loginSchema.find({
        email: email
    }).then(data => {
        if (!data) {
            return res.json(BaseResponse.sendError('Invalid Email....!'));
        }
        if (password === crypto.decrypt(data[0].hashPassword)) {
            const { _id, email: uEmail, role } = data;
            jwt.sign(
                { _id, email: uEmail, role },
                config.jwt.jwtKey,
                { expiresIn: '1d' },
                (err, token) => (err
                    ? res.status(500).json(BaseResponse.sendError('', err))
                    : res.status(200).json(BaseResponse.sendSuccess('Authorized...!', {
                        token: token,
                        role
                    }))
                )
            );
        } else {
            return res.json(BaseResponse.sendError('Invalid Password'));
        }
    })
});


// router.post('/decrypt-token', (req, res) => {
//     console.log(req.body.token);
//     try {
//         const token = crypto.decrypt(req.body.token);
//         jwt.verify(token, config.jwt.jwtKey);
//         return res.status(200).json(BaseResponse.sendSuccess('Decrypted token..!', token));
//     } catch (error) {
//         return res.status(401).json(BaseResponse.sendError('Unauthorized..!'));
//     }
// });

router.get('/check-auth', checkAuthMiddleWare, (req, res) => res.json(BaseResponse.sendSuccess('Authorized..!')));

router.get('/', (req, res) => {
    loginSchema.find({
        role: 'user'
    })
        .then(data => res.json(BaseResponse.sendSuccess('Data', data)))
        .catch(error => res.json(BaseResponse.sendError('Error', error)));
});

module.exports = router;


// module.exports = function createLogin(req, res) {
//     const login = new loginSchema({
//         _id: mongoose.Types.ObjectId(),
//         email: req.body.email,
//         name: req.body.name,
//         hashPassword: crypto.encrypt(req.body.password),
//         phone: req.body.phone,
//         address: req.body.address
//     });
//     return login
//         .save()
//         .then((newlogin) => res.json(BaseResponse.sendSuccess('New Login created Successfully')))
//         .catch((error) => res.json(BaseResponse.sendError('Error while database Creating...!', error)));
// }