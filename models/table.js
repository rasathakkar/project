const mongoose = require('mongoose')
const schema = mongoose.Schema

const tableSchema = new schema(
    {
        from:{
            type: String,
            trim: true,
            required: true
        },
        to:{
            type: String,
            trim: true,
            required: true
        },
        type:{
            type: String,
            trim: true,
            required: true
        },
        weight:{
            type: String,
            trim: true,
            required: true
        },
        export:{
            type: String,
            trim: true,
            required: true
        },
        total:{
            type: String,
            trim: true,
            required: true
        }
       
    }
)
module.exports = mongoose.model('Table', tableSchema)