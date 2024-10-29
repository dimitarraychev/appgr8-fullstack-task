const express = require("express");
const app = express();
const port = 3000;

const { notes } = require("./data/notes");

app.get("/", (req, res) => {
  res.send(notes);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
