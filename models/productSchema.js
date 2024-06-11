const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    image:String,
    productname:String,
    description:String,
    price:String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    
})

module.exports= mongoose.model("product",productSchema);