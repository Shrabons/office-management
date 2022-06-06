const mongoose = require('mongoose')
const {Schema} = mongoose


const signupSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
})

const SignUp = mongoose.model("Signup", signupSchema)
module.exports = SignUp