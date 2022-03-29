const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        match: /^.*@.*\..*$/,
        required: true         
    },
    password: {
        type: String,
        required: true,
        minlenght: 1
    },
    name: {
        type:String,
        minlenght:2,
        required:true
    }
})

module.exports = mongoose.model('users', userSchema)