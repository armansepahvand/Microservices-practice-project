const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  //get the event type and data from request body
  const { type, data } = req.body;

  //if type of the event is CommentCreated
  if (type === "CommentCreated") {
    //set status to "rejected if the comment content includes "orange"
    //otherwise set it to approved
    const status = data.content.includes("orange") ? "rejected" : "approved";

    //Create a new event of type CommentModerated with the updated status and send it to the event bus
    await axios.post("http://localhost:4005/events", {
      type: "CommentsModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on Port 4003");
});
