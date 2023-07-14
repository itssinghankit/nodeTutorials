const express=require("express");
const https=require("https");
const bodyParser=require("body-parser")

const app =express();
app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){
    var type=req.body.Iname;

    var url="https://api.unsplash.com/search/photos?&query="+type+"&client_id=q9mt5PO7SFAW9tuYBYScqqQryyKimNnFW0sEsB-O2Ss";

    Rdata="";

    https.get(url,function(response){
        response.on("data",function(data){
            Rdata+=data;
        });

        response.on("end",function(){
            var parsedData=JSON.parse(Rdata);
            res.write("<h1>"+parsedData.results[0].alt_description+"</h1>");
            res.write("<h1>"+parsedData.results[0].description+"</h1>");
            res.write("<img src="+parsedData.results[0].urls.small+">");
            res.send();
        })

    })

})

app.get("/",function(req,res){
    
   res.sendFile(__dirname+"/index.html")
});

app.listen(3000,function(){
    console.log("server started");
});