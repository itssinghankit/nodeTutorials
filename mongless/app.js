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
    rating:{
        type:Number,
        required:[true,"please include the rating"],
        min:1,
        max:10
    },
    review:String
});

const Fruit=mongoose.model("Fruit",fruitSchema);

// const apple=Fruit({
//     name:"Apple",
//     rating:3,
//     review:"good one"
// });

// fruit.save();

// const kiwi=Fruit({
//     name:"Kiwi",
//     rating:7,
//     review:"nice one"
// });

// const banana=Fruit({
//     name:"banana",
//     rating:8,
//     review:"healthy"
// });

// const orange=Fruit({
//     name:"orange",
//     rating:6,
//     review:"vitamin C"
// })

// Fruit.insertMany([apple,kiwi,banana,orange]).then(()=>{
//     console.log("inserted");
// }).catch((err)=>{
//     console.error(err);
// });

        //to access objects elements

// Fruit.find().then((fruits)=>{
//     fruits.forEach(element=>{
//         console.log(element.review);
//         mongoose.connection.close();
//     })
// }).catch((err)=>{
//     console.log(err);
// })

            //for showing all data

// Fruit.find()
// .then((fruits) => {
//     console.log(fruits);
//     // mongoose.connection.close();
// })
// .catch((err) => {
//     console.error(err);
// });

            // for updating a  ny data field

// Fruit.updateMany({ name: 'orange' }, { Field: 'some value' })
//   .then(() => {
//     console.log('updated');
//   })
//   .catch((err) => {
//     console.error(err);
//   });

            //for deleting elements, can use deleteOne or deleteMany

// Fruit.deleteMany({name:"orange"})
// .then(()=>{console.log("deleted")})
// .catch((err)=>{console.log(err)});


            //making a relationship bet two collection

const personSchema=mongoose.Schema({
    name:String,
    age:Number,
    favFruit:fruitSchema
});

const Person=mongoose.model("person",personSchema);

const pineapple=Fruit({
    name:"pineapple",
    rating:6,
    review:"decent"
});

Fruit.insertMany([pineapple]).then(()=>{
    console.log("inserted");
}).catch((err)=>{
    console.error(err);
});
// pineapple.save();

// const john=Person({
//     name:"john",
//     age:23,
//     favFruit:pineapple
// });

// john.save().then(()=>{
//     console.log("saved");
// }).catch((err)=>{
//     console.error(err);
// });

// Person.updateOne({name:"john"},{favFruit:mango}).then(()=>{
//     console.log("updated");
// }).catch((err)=>{
//     console.error(err);
// });

// Fruit.deleteMany({ _id: "64b42e6be26b9dccb4fdcb6d"}).then(()=>{
//     console.log("deleted");
// }).catch((err)=>{
//     console.error(err);
// });

  
  
  
  
  


