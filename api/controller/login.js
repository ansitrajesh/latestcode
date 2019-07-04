const mongoose = require('mongoose');
const router = require('express').Router();
const loginSchema = require('../../models/login.model');
const crypto = require('../../utils/crypto');
const BaseResponse = require('../../utils/response');


router.post('/', (req, res) => {
    const login = new loginSchema({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        name: req.body.name,
        hashPassword: crypto.encrypt(req.body.password),
        phone: req.body.phone,
        address: req.body.address
    });
    return login
        .save()
        .then((newlogin) => res.json(BaseResponse.sendSuccess('New Login created Successfully')))
        .catch((error) => res.json(BaseResponse.sendError('Error while database Creating...!', error)));
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