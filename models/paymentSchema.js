const mongoose = require("mongoose");
const paymentSchema = mongoose.Schema({
    quantity:String,
    colour:{
        type:String,
        enum:["red","black","white"]
    },
    coupon:String, 
    product:{type:mongoose.Schema.Types.ObjectId ,ref:"product"}

})

const product = mongoose.model("payment",paymentSchema);
module.exports=product;
