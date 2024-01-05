const express = require("express");
const { protect } = require("../middlewares/authentication");
const {
	createNote,
	getAllNotes,
	getNoteById,
	updateNoteById,
	deleteNoteById,
	searchNotes,
} = require("../controller/notes");
const notesRouter = express.Router();

notesRouter.get("/search", protect, searchNotes);
notesRouter.get("/", protect, getAllNotes);
notesRouter.get("/:id", getNoteById);
notesRouter.post("/", protect, createNote);
notesRouter.put("/:id", protect, updateNoteById);
notesRouter.delete("/:id", protect, deleteNoteById);
notesRouter.post("/:id/share", protect);


module.exports = notesRouter;
