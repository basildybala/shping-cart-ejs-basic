const mongoose=require('mongoose');
const connectDB=async () =>{
 try{
   // mongodb connection string
   const con=await mongoose.connect('mongodb://localhost:27017/LearnEjsShopping',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
     console.log("Connected Mongodb");
   }catch(err){
       console.log(err);
   }
}

module.exports=connectDB