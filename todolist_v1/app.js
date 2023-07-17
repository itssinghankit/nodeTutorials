const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs")

const app =express();

app.set("view engine","ejs");

var today=new Date();
var day=""

app.get("/",function(req,res){
   if((today.getDay()===6)||(today.getDay()===0)){
    day="weekend";
   }else{
    day="weekday"
   }

   res.render("list",{kindOfDay:day});

})

app.listen(3000,()=>{
    console.log("connected to server");
})
