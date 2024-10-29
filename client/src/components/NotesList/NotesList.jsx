import { useEffect, useState } from "react";
import NoteCard from "../NoteCard/NoteCard";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = async () => {
    const url = "http://localhost:3000/notes";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch(url, options);
      const json = await res.json();

      setNotes(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Notes</h2>
      {notes.map((n) => (
        <NoteCard key={n.id} note={n} />
      ))}
    </>
  );
};

export default NotesList;
