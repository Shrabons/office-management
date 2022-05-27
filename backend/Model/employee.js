const mongoose = require('mongoose')

const { Schema } = mongoose;

const emloyeeSchema = new Schema({
    name:String,
    time:String,
    designation:String,
    dayoff:String,
})

const Employee = mongoose.model('Employee', emloyeeSchema)
module.exports = Employee