const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
 
const uerSchema = mongoose.Schema({
    name:String,
    username:String,
    email:{
        type:String,
        unique:true,
    },
    password:Number,
})

uerSchema.plugin(plm);
module.exports = mongoose.model("database",uerSchema);