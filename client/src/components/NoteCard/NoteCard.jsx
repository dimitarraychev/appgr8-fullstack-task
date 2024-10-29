import "./NoteCard.css";

const NoteCard = ({ note }) => {
  const editHandler = () => {
    console.log(note.id);
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

  return (
    <div className="note-card">
      <h3>{note.content}</h3>

      <div className="btn-wrapper">
        <button onClick={editHandler}>Edit</button>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
