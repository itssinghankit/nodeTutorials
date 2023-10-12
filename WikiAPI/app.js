const express= require("express");
const mongoose= require("mongoose");
const ejs = require("ejs");
const bodyParser=require("body-parser");

const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(3000,()=>{
console.log("server started on port 3000");
});

