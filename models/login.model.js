const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LoginSchema = new Schema({
    email: { type: String, max: 100 },
    name: { type: String, max: 100 },
    hashPassword: { type: String, max: 255 },
    phone: { type: Number },
    address: { type: String, max: 255 }
});
module.exports = mongoose.model('login', LoginSchema);