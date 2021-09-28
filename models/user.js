const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema(
    {
        name:{
            type: String,
            trim: true,
            required: true
        },
        email:{
            type: String,
            trim: true,
            required: true
        },
        password:{
            type: String,
            trim: true,
            required: true
        },
        phone:{
            type: String,
            trim: true,
            required: true
        },
        pin:{
            type: String,
            trim: true,
            required: true
        },
        state:{
            type: String,
            trim: true,
            required: true
        },
        city:{
            type: String,
            trim: true,
            required: true
        }

    }
)
module.exports = mongoose.model('User', userSchema)