const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

//It adds some methods to schema 
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);