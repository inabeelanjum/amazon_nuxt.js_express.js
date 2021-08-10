const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require('./models/user');
const app = express ();
dotenv.config();
mongoose.connect( 
    process.env.DATABASE ,
{ useUnifiedTopology: true ,  useNewUrlParser: true  } , 
(err)=>{
if(err){
    console.log(err);
}
else{
    console.log("database connected");
}
})

// Middlewares //
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

// get data from the server
app.get('/' ,(req,res)=>{
    res.json({
        message:"hello amazon clone"
    });
});
//send data from front end to backend
app.post("/", ( req , res) =>
{
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save( err => {
        if(err){
            res.json(err);
        }
        else{
            res.json("success");
        }
    })
});



app.listen(3000, (err)=>{
    if(err){
        console.log(err)
    }
    else {
        console.log("listening on Port " ,3000)
    }
});
