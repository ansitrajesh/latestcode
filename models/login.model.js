const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
let LoginSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, max: 100 },
    name: { type: String, max: 100 },
    hashPassword: { type: String, max: 255 },
    phone: { type: Number },
    address: { type: String, max: 255 }
});
module.exports = mongoose.model('login', LoginSchema);