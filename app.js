const express =require('express');
const app=express();
const dotenv=require('dotenv');
const path=require('path');
const connectDB=require('./database/connection')

const session=require('express-session');
const expressValidator=require('express-validator');
const bodyparser=require('body-parser');
const morgan =require('morgan');
const pages=require('./routes/pages')
const adminPages=require('./routes/admin-pages')
const adminCategory=require('./routes/adminCategory')





//Databse Connection

connectDB()

dotenv.config()
app.use(express.json());
//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true} ));

//LOGs
app.use(morgan('tiny'));

// set view engine
app.set("view engine", "ejs")

// View engine setup
// app.set ('views', path.join(__dirname, 'views'));
// app.set ('view engine', 'ejs');

// Set public folder
app.use (express.static (path.join(__dirname, 'public')));

//Express-Session
app.use (session ({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie:{secure: true}
}))

//Express Validator
// app.use (expressValidator({
//     errorFormatter: function(param, msg, value){
//         var namespace=param.split('.')
//           ,root=namespace.shift()
//          ,formParam=root;
                   
//       while(namespace.length){
//         formParam += '['+namespace.shift()+']';
//       }
//       return{
//         param:formParam,
//         msg: msg,
//         value:value
//        };
//     }
// }));

// Express Messages middlewaze


app.use(require('connect-flash')());
app.use (function (req, res, next){
 res.locals.messages=require('express-messages') (req, res);
 next ();
});

//Set Up Routes
app.use('/',pages)
app.use('/admin/pages',adminPages)
app.use('/admin/categories',adminCategory)

//Server Run
app.listen(process.env.PORT,()=>{
console.log('Server Running '+process.env.PORT);
})