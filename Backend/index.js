import express from "express";
import cors from "cors";
import { connectDB } from "./config/mongodb.js";
import "dotenv/config";
import Note from "./models/noteModel.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

await connectDB();

app.get("/", async (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.get("/api/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  const newNote = new Note(req.body);
  const savedNote = await newNote.save();
  res.json(savedNote);
});

app.put("/api/notes/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  } else {
    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    await note.save();
  }

  res.json(note);
});

app.delete("/api/notes/:id", async (req, res) => {
  const deletedNote = await Note.findByIdAndDelete(req.params.id);
  if (!deletedNote) {
    return res.status(404).json({ error: "Note not found" });
  }
  res.json(deletedNote);
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});