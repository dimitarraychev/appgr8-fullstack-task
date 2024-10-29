import { useState } from "react";
import "./NoteForm.css";

const NoteForm = () => {
  const [inputs, setInputs] = useState({ content: "" });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    createNote();
  };

  const createNote = async () => {
    const url = "http://localhost:3000/notes";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
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
    <form className="note-form" onSubmit={submitHandler}>
      <h2>New Note</h2>

      <label htmlFor="content">Content:</label>
      <input
        type="text"
        name="content"
        id="content"
        placeholder="Your note..."
        value={inputs.content}
        onChange={changeHandler}
      />

      <input type="submit" value="Submit" className="submit-btn" />
    </form>
  );
};

export default NoteForm;
