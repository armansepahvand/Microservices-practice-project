const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

//posts object to temporarily save the created comments in memory
const commentsByPostId = {};

//get method to get the comments
app.get("/posts/:id/comments", (req, res) => {
  res.send(comments);
});

//post method to create comments
app.post("/posts/:id/comments", (req, res) => {
  //create a randome id for each comment
  const commentId = randomBytes(4).toString("hex");

  //getting the content from reuest body
  const { content } = req.body;

  //omments constant to get the comments if they exist in commentsByPostId object or set to empty array
  const comments = commentsByPostId[req.params.id] || [];

  // push new comment created by user to the comments array
  comments.push({ id: commentId, content });

  // save the creeated comments array inside commentsByPostId object
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments[id]);
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});
