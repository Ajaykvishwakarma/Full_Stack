const mongoose = require('mongoose')
const flatSchema = new mongoose.Schema(
    {
        type : { type : String, required : true },
        block : { type : String, required : true },
        no : { type : Number, required : true },
        residents : [{
                        name : { type : String, required : true },
                        gender : { type : String, required : true },
                        age : { type : Number, required : true },
                    }]
    },
    {
        versionKey : false
    }
)

module.exports = mongoose.model('flat', flatSchema)