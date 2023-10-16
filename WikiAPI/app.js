const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

// mongoose.connect("mongodb://0.0.0.0/wikiDB", {
mongoose.connect("mongodb+srv://itssinghankit:9555970464@cluster0.mpq06l0.mongodb.net/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to db"));


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set("view engine", "ejs");

const articleSchema = {
  title: String,
  content: String
};

const Articles = mongoose.model("articles", articleSchema);

app.get("/", (req, res) => {
  res.send("welcome to our website");
});

////////////////////////////////////////////////// new method of route ///////////////////////////////////

app.route("/articles")
  .get((req, res) => {

    Articles.find()
      .then((articles) => {
        res.send(articles);
      })
      .catch((err) => {
        res.send(err);
      });

  })
  .post((req, res) => {

    const newArticle = new Articles({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save()
      .then(() => {
        res.send("successfully add new article");
      })
      .catch((err) => {
        res.send(err);
      });

  })
  .delete((req, res) => {

    Articles.deleteMany()
      .then(() => {
        res.send("articles deleted successfully");
      })
      .catch((err) => {
        res.send(err);
      });

  });

////////////////////////////////////////////////// for perticular article //////////////////////////////

app.route("/articles/:articleTitle")
  .get((req, res) => {
    Articles.findOne({ title: req.params.articleTitle })
      .then((foundArticle) => {
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send("Article not found");
        }
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .put((req, res) => {

    Articles.updateOne(

      { title: req.params.articleTitle },
      { $set: { title: req.body.title, content: req.body.content } }

    )
      .then(() => {
        res.send("Article updated successfully");
      })
      .catch((err) => {
        res.send(err);
      });

  })
  .patch((req, res) => {

    Articles.updateOne(

      { title: req.params.articleTitle },
      { $set: req.body }

    )
      .then(() => {
        res.send("specific detail is updated");
      })
      .catch((err) => {
        res.send(err);
      });

  })
  .delete(async (req, res) => {

    try {
      const articleTitle = req.params.articleTitle;
      const article = await Articles.findOne({ title: articleTitle });
      if (!article) return res.status(400).json({ message: "Already Deleted" });
      await Articles.deleteOne({ title: articleTitle });
      return res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
      console.log(error.message);
    }
  });

//         //for get request
// app.get("/articles",(req,res)=>{
//   Articles.find().then((articles)=>{

//                   // show all articles
//     // console.log(articles);

//                   // to access each articles
//     // articles.forEach((element)=>{
//     //   console.log(element);
//     //   // mongoose.connection.close();
//     // })

//     res.send(articles);
//     // mongoose.connection.close();


//   }).catch((err)=>{
//     console.log(err);
//   });
// });

//       //for post request
// app.post("/articles",(req,res)=>{

//   // console.log(req.body.title);
//   // console.log(req.body.content);
//   // res.send("received");

//       //to save data in our mongo DB database
//   const newArticle= new Articles({
//     title: req.body.title,
//     content: req.body.content

//   });
//   newArticle.save(
//     // function(err){
//     //   if(!err){
//     //     res.send("SAVED");
//     //   }else{
//     //     res.send(err);
//     //   }
//     // }
//     ).then(()=>{res.send("saved");
//   }).catch((err)=>{res.send(err)})

// });

// app.delete("/articles",(req,res)=>{
//   Articles.deleteMany(
//   ).then(()=>{res.send("succesfully deleted")}
//   ).catch((err)=>{res.send(err)});
// });

app.listen(3000, () => {
  console.log("server started on port 3000");
});