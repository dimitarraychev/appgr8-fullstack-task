const express = require("express");
const { randomUUID } = require("crypto");
const cors = require("cors");
const { notes } = require("./data/notes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:noteId", (req, res) => {
  const noteId = req.params.noteId;
  const note = notes.find((n) => n.id === noteId);

  if (!note) {
    res.status(404).json({
      ok: false,
      message: "No note with the given ID.",
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

app.delete("/notes/:noteId", (req, res) => {
  const noteId = req.params.noteId;
  const note = notes.find((n) => n.id === noteId);

  if (!note) {
    res.status(404).json({
      ok: false,
      message: "No note with the given ID.",
    });
  }

  notes = notes.filter((n) => n.id !== noteId);

  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
