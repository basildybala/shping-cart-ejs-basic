const mongoose = require("mongoose");

const PagesSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        unique:true,
    },
    content:{
        type: String,
        required: true
    },
    sorting:{
        type: Number
    }
       
},{timestamps:true} )

module.exports=mongoose.model('Page',PagesSchema)