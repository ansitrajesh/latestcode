const mongoose = require('mongoose');
const router = require('express').Router();
const registerSchema = require('../../models/register.model');
const BaseResponse = require('../../utils/response');

router.post('/', (req, res) => {
    const register = new registerSchema({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    });
    return register
        .save()
        .then(() => res.json(BaseResponse.sendSuccess('New Register Created Successfully')))
        .catch((error => res.json(BaseResponse.sendError('Database not created', error))));
});

router.get('/', (req, res) => {
    registerSchema.find({}, (err, data) => {
        console.log(data);
    });
});

module.exports = router;


// module.exports = function createRegister(req, res) {
//     const registerSchema = new registerSchema({
//         _id: mongoose.Types.ObjectId(),
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         address: req.body.address
//     });
//     return registerSchema
//         .save()
//         .then(() => res.json(BaseResponse.sendSuccess('New Register Created Successfully')))
//         .catch((error => res.json(BaseResponse.sendError('Database not created'))));
// }