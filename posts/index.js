const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//posts object to temporarily save the created posts in memory
const posts = {};

//get method to get the posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

//post method to create posts
app.post("/posts", async (req, res) => {
  //create a randome id for each post
  const id = randomBytes(4).toString("hex");

  //getting the title from reuest body
  const { title } = req.body;
  //add the new post to the posts object
  posts[id] = {
    id,
    title,
  };

  //a post request to event bus to send the created post to event-bus
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("recieved event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
