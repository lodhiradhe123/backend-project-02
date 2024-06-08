const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://radheshyamlodhi48:Ogt7TZEA5msLIShC@cluster0.3fivs3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connected to finaldatabase");
}).catch((err)=>{
    console.log(err);
})