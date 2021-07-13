const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String,required: true},
    password: {type: String,required: true},
    password2: {type: String,required: true},
    hasProfile: {type: Boolean,default: false}
});
const User= mongoose.model('User',UserSchema);

module.exports = User;