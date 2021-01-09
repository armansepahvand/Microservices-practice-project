const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//posts object to temporarily save the created comments in memory
const commentsByPostId = {};

//get method to get the comments
app.get("/posts/:id/comments", (req, res) => {
  //send the commentsByPostId or an empty array if undefined
  res.send(commentsByPostId[req.params.id] || []);
});

//post method to create comments
app.post("/posts/:id/comments", async (req, res) => {
  //create a randome id for each comment
  const commentId = randomBytes(4).toString("hex");

  //getting the content from reuest body
  const { content } = req.body;

  //omments constant to get the comments if they exist in commentsByPostId object or set to empty array
  const comments = commentsByPostId[req.params.id] || [];

  // push new comment created by user to the comments array
  comments.push({ id: commentId, content, status: "pending" });

  // save the creeated comments array inside commentsByPostId object
  commentsByPostId[req.params.id] = comments;

  //a post request to event bus to send the created comment to event-bus
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(commentsByPostId[req.params.id]);
});

app.post("/events", (req, res) => {
  console.log("recieved event", req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});
