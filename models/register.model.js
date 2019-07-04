const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
let RegisterSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    phone: { type: Number, required: true },
    address: { type: String, required: true, max: 255 }
});

module.exports = mongoose.model('Register', RegisterSchema);