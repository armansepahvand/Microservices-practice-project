const express = require("express");

const app = express();

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/post", (req, res) => {});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
