const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const Post = require('./models/post');

const app = express();

mongoose.connect("link")
.then(() => {
  console.log('Connected to Database!');
})
.catch(() => {
  console.log('Connection to Database Failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "HttpHeaders"],
    methods: ["GET", "POST", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    });
    post.save().then(addedPost => {
      res.status(201).json({
        message: 'Post added successfully',
        postId: addedPost._id
      });
    });
});

app.get("/api/posts", (req, res, next) => {
    Post.find().then((documents) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: documents
      });
    });
});

app.delete("/api/posts/delete/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
      console.log(result);
      res.status(200).json({message: "Posts deleted!"});
    })
});

module.exports = app;