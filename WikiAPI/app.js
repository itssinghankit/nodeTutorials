const express= require("express");
const mongoose= require("mongoose");
const ejs = require("ejs");
const bodyParser=require("body-parser");

const app= express();
 
mongoose.connect("mongodb://0.0.0.0/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine","ejs");

const articleSchema={
  title:String,
  content:String
};

const Articles=mongoose.model("articles",articleSchema);

app.get("/articles",(req,res)=>{
  Articles.find().then((articles)=>{

                  // show all articles
    // console.log(articles);

                  // to access each articles
    // articles.forEach((element)=>{
    //   console.log(element);
    //   // mongoose.connection.close();
    // })

    res.send(articles);
    mongoose.connection.close();

  }).catch((err)=>{
    console.log(err);
  });
});

app.listen(3000,()=>{
console.log("server started on port 3000");
});
