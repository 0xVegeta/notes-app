const Note = require('../models/notes.model')
const createNote = async (req, res) => {
  const { textBody } = req.body;
  
	const Note = new Chat({
		author: req.user,
		textBody
	});
	await Note.save();
	return res.status(200).json(Note);
};

const getAllNotes = async (req, res) => {
	try {
		const notes = await Note.find({author: req.user});
		return res.status(200).json({ notes });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error fetching your notes" });
	}
};





module.exports = {
  createNote
}
