const express = require("express");
const { randomUUID } = require("crypto");
const { notes } = require("./data/notes");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:noteId", (req, res) => {
  const noteId = req.params.noteId;
  const note = notes.find((n) => n.id === noteId);

  if (!note) {
    res.status(404).json({
      ok: false,
      message: "No post with the given ID.",
    });
  }

  res.json(note);
});

app.post("/notes", (req, res) => {
  const note = req.body;
  const id = randomUUID();

  const noteToCreate = { ...note, id };

  notes.push(noteToCreate);
  res.status(201).json(noteToCreate);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
