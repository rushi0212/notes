import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {

  const [notes, setNotes] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const { data } = await axios.get(`${backendURL}/api/notes`);
      setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes", error);
    }
  }

  async function addNote(newNote) {
    try {
      const { data } = await axios.post(`${backendURL}/api/notes`, newNote);
      setNotes(prev => [...prev, data]);
    } catch (error) {
      console.error("Failed to add note", error);
    }
  }

  async function updateNote(id, updatedNote) {
    try {
      const { data } = await axios.put(`${backendURL}/api/notes/${id}`, updatedNote);
      setNotes(prev =>
        prev.map(note => note._id === id ? data : note)
      );
    } catch (error) {
      console.error("Failed to update note", error);
    }
  }

  async function deleteNote(id) {
    try {
      await axios.delete(`${backendURL}/api/notes/${id}`);
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />

      {notes.map((noteItem) => (
        <Note
          key={noteItem._id}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          onUpdate={updateNote}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;