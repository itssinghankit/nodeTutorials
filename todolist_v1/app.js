const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs")
const date=require(__dirname+"/modulefunc.js")

const app =express();

let items=["Buy Food","Cook Food","Eat Food"];
let workItems=[];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine","ejs");

app.get("/",function( req,res ){

    const day=date.getDate();

   res.render("list",{listHeading:day,listItems:items});

});

app.post("/",function(req,res){

if(req.body.button==="Work"){
    workItems.push(req.body.newItem)
    res.redirect("/work")
}else{
   items.push(req.body.newItem);
   res.redirect("/");
}

});

//for work page
app.get("/work",function(req,res){
 
res.render("list",{listHeading:"Work",listItems:workItems})

})

//for about page
app.get("/about",function(req,res){
    res.render("about")
})

app.listen(3000,()=>{
    console.log("connected to server");
})
