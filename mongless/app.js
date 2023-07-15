const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0/fruitsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const fruitSchema = mongoose.Schema({
    name:String,
    rating: Number,
    review:String
});

const Fruit=mongoose.model("Fruit",fruitSchema);

const fruit=Fruit({
    name:"Apple",
    rating:2,
    review:"good one"
});

// fruit.save();

const personSchema=mongoose.Schema({
    name:String,
    age:Number

});

const Person=mongoose.model("Person",personSchema);

const person=Person({
    name:"john",
    age:27
});

const kiwi=Fruit({
    name:"Kiwi",
    rating:7,
    review:"nice one"
});

const banana=Fruit({
    name:"banana",
    rating:8,
    review:"healthy"
});

const orange=Fruit({
    name:"orange",
    rating:6,
    review:"vitamin C"
})

Fruit.insertMany([kiwi,banana,orange]);


