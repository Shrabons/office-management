const mongoose = require('mongoose')
const {Schema} = mongoose

const classitmeSchema = new Schema({
    batch: {
        type: String,
        required: true,
        unique: true
    },
    time: {
        type: String,
        required: true,
        
    },
    room: {
        type: String,
        required: true,
    },
})

const Classtime = new mongoose.model('Classtime',classitmeSchema)
module.exports = Classtime