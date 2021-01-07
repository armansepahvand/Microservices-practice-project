const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

//posts object to temporarily save the created posts in memory
const posts = {};

//get method to get the posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

//post method to create posts
app.post("/posts", (req, res) => {
  //create a randome id for each post
  const id = randomBytes(4).toString("hex");

  //getting the title from reuest body
  const { title } = req.body;
  //add the new post to the posts object
  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
