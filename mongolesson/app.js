const mc=require("mongodb").MongoClient;
const assert= require("assert");

const url="mongodb://127.0.0.1:27017/";

const dbName="fruitsDb";

const client=new mc(url);

client.connect(function(err){
    assert(null,err);
    console.log("connected successfully to mongo server");

    const db=client.db(dbName);

    client.close();
});