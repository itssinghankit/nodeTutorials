const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs")

const app =express();

let items=["Buy Food","Cook Food","Eat Food"]

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

let today=new Date();

let options={
    weekday:"long",
    day:"numeric",
    month:"long"
};

let date=today.toLocaleDateString("en-US",options)

app.get("/",function(req,res){

   res.render("list",{kindOfDay:date,listItems:items});

});

app.post("/",function(req,res){
   items.push(req.body.newItem);
   res.redirect("/");
});

app.listen(3000,()=>{
    console.log("connected to server");
})
