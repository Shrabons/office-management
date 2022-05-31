const mongoose = require('mongoose')
const {Schema} = mongoose


const postSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
})

const Post = new mongoose.model('Post', postSchema)
module.exports = Post