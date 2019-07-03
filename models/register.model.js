const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RegisterSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    phone: { type: Number, required: true, max: 100 },
    address: { type: String, required: true, max: 255 }
});

module.exports = mongoose.model('Register', RegisterSchema);