const mongoose = require('mongoose')

const { Schema } = mongoose;

const mainSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    day:{
        type: String,
        required: true
    },
    descripation:{
        type: String,
        required: true
    },
   

   
})

const Mainpost = mongoose.model('postmain', mainSchema)
module.exports = Mainpost