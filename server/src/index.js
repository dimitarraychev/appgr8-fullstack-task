const express = require("express");
const { randomUUID } = require("crypto");
const cors = require("cors");
let { notes } = require("./data/notes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/notes", (req, res) => {
  try {
    res.json(notes);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/notes/:noteId", (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = notes.find((n) => n.id === noteId);

    if (!note) {
      res.status(404).json({
        ok: false,
        message: "No note with the given ID.",
      });
    }

    res.json(note);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/notes", (req, res) => {
  try {
    const note = req.body;
    const id = randomUUID();

    const noteToCreate = { ...note, id };

    notes.push(noteToCreate);
    res.status(201).json(noteToCreate);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put("/notes/:noteId", (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = req.body;

    const presentNote = notes.find((n) => n.id === noteId);

    if (!presentNote) {
      res.status(404).json({
        ok: false,
        message: "No note with the given ID.",
      });
    }

    presentNote.content = note.content;

    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.delete("/notes/:noteId", (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = notes.find((n) => n.id === noteId);

    if (!note) {
      res.status(404).json({
        ok: false,
        message: "No note with the given ID.",
      });
    }

    notes = notes.filter((n) => n.id !== noteId);

    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
