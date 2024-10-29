import { useState } from "react";
import "./NoteCard.css";

const NoteCard = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);

  const editHandler = () => {
    setIsEditing(true);
  };

  const finishEditHandler = async () => {
    setIsEditing(false);

    const url = "http://localhost:3000/notes/" + note.id;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    };

    try {
      const res = await fetch(url, options);
      const json = await res.json();

      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async () => {
    const url = "http://localhost:3000/notes/" + note.id;
    const options = {
      method: "DELETE",
    };

    try {
      const res = await fetch(url, options);
      const json = await res.json();

      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setContent(value);
  };

  return (
    <div className="note-card">
      {!isEditing ? (
        <h3>{content}</h3>
      ) : (
        <input type="text" value={content} onChange={changeHandler} />
      )}
      {isEditing ? (
        <button onClick={finishEditHandler}>Done</button>
      ) : (
        <div className="btn-wrapper">
          <button onClick={editHandler}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
