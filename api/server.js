const express=require("express");
const https=require("https");

const app =express();

app.get("/",function(req,res){
    const url="https://api.unsplash.com/search/photos?&query=android&client_id=q9mt5PO7SFAW9tuYBYScqqQryyKimNnFW0sEsB-O2Ss";
    https.get(url,function(response){
        console.log(response.statusCode);

        let responseData="";

        response.on("data", function(data) {
            // Accumulate the received data
        
            responseData += data;
        });
    
        response.on("end", function() {
            // Parse the accumulated data once all data has been received
            const information = JSON.parse(responseData);
            // Handle the parsed information as needed
            console.log(information.results[0].alt_description)
        });

    });
    res.send("successful");
});

app.listen(3000,function(){
    console.log("server started");
});