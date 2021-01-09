const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//post object to save the posts and their comments
const posts = {};

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

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
