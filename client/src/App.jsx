import NoteForm from "./components/NoteForm/NoteForm";
import NotesList from "./components/NotesList/NotesList";

function App() {
  return (
    <>
      <h1>My notes app</h1>
      <NoteForm />
      <NotesList />
    </>
  );
}

export default App;
