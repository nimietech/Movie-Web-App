const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
    name: 
    {type: String, required: true,},

    password: 
    {type: String, required: true,},

});

const Login = mongoose.model('signupusers',LoginSchema)
module.exports = Login

