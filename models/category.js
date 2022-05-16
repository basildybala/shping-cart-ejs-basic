const mongoose = require("mongoose");

const CategoryScema= new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        unique:true,
    }
       
})

module.exports=mongoose.model('Category',CategoryScema)