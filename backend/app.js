const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Header",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

app.use("/api/posts", (req, res, next) => {
    const postsList = [
        {
            id: "abc12",
            title: "First Post",
            content: "This is coming from the server!"
        },
        {
            id: "def23",
            title: "Second Post",
            content: "This is coming from the server!"
        }
    ]

    res.status(200).json({
        message: "Posts fetched successfully",
        posts: postsList
    });
});

module.exports = app;