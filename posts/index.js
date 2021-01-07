const express = require("express");

const app = express();

app.get("/posts", (req, res) => {});

app.post("/post", (req, res) => {});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
