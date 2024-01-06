const Note = require("../models/notes.model");
const createNote = async (req, res) => {
	let { textBody } = req.body;
	if (!textBody) {
		return res.status(400).json({ error: "Enter all the fields" });
	}

	const note = await Note.create({
		author: req.user,
		textBody,
	});

	return res
		.status(200)
		.json({ textBody: note.textBody, author: req.user.email, id: note._id });
};

const getNoteById = async (req, res) => {
	try {
		const noteId = req.params.id;
		const note = await Note.findById(noteId);

		if (!noteId || !note) {
			return res.status(404).json({ error: "Invalid note ID" });
		} else if (note.author.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ error: "Unauthorized to access this note" });
		}

		return res.status(200).json({ note });
	} catch (error) {
		console.error(error.stack);
		return res.status(500).json({ error: "Error fetching your note" });
	}
};

const getAllNotes = async (req, res) => {
	try {
		const notes = await Note.find({ author: req.user });
		const notesArray = notes.map((note) => {
			return {
				id: note._id,
				textBody: note.textBody,
				date: note.date,
				author: req.user.email,
			};
		});
		return res.status(200).json({ notes: notesArray });
	} catch (error) {
		return res.status(500).json({ error: "Error fetching your notes" });
	}
};

const updateNoteById = async (req, res) => {
	try {
		const noteId = req.params.id;
		let { textBody } = req.body;
		if (!textBody) return res.status(400).json({ error: "No new updates" });
		const note = await Note.findById(noteId);

		if (!noteId || !note) {
			return res.status(404).json({ error: "Invalid note ID" });
		} else if (note.author.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ error: "Unauthorized to update this note" });
		}

		note.textBody = textBody;
		await note.save();

		return res
			.status(200)
			.json({ textBody: note.textBody, author: req.user.email });
	} catch (error) {
		console.error(error.stack);
		return res.status(500).json({ error: "Error updating your note" });
	}
};

const deleteNoteById = async (req, res) => {
	try {
		const noteId = req.params.id;

		const note = await Note.findById(noteId);

		if (!noteId || !note) {
			return res.status(404).json({ error: "Invalid note ID" });
		} else if (note.author.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ error: "Unauthorized to delete this note" });
		}

		await Note.findByIdAndDelete(noteId);

		return res.status(200).json({ message: "Note deleted successfully" });
	} catch (error) {
		console.error(error.stack);
		return res.status(500).json({ error: "Error deleting your note" });
	}
};

const searchNotes = async (req, res) => {
	try {
		const { q } = req.query;

		const notes = await Note.find({
			author: req.user,
			textBody: { $regex: new RegExp(q, "i") },
		});

		const notesArray = notes.map((note) => {
			return {
				id: note._id,
				textBody: note.textBody,
				date: note.date,
				author: req.user.email,
			};
		});

		return res.status(200).json({ notes: notesArray });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error searching your notes" });
	}
};

module.exports = {
	createNote,
	getAllNotes,
	getNoteById,
	updateNoteById,
	deleteNoteById,
	searchNotes,
};
