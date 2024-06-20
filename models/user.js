const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
 
const uerSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    username:{
        type: String,
        required: [true, 'username is required'],
        trim: true,
        minlength: [3, 'username must be at least 3 characters long']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password:{
        type: String,
        
    },
    role:{type:String,
        enum:["seller","user"]
    }
})

uerSchema.plugin(plm);
module.exports = mongoose.model("database",uerSchema);