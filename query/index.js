const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//post object to save the posts and their comments
const posts = {};

// a function to proccess events based on their type
const eventHandler = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    console.log(status);

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id == id;
    });

    comment.status = status;
    comment.content = content;
  }
};
//get method to send al the posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

//post method to recive the events and proccess them using eventHandler function
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  eventHandler(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");

  //save all the existing events into res variable
  const res = await axios.get("http://localhost:4005/events");

  //loop over all the existing events and proccess them using eventHandler function
  for (let event of res.data) {
    eventHandler(event.type, event.data);
  }
});
