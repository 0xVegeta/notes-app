const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
	textBody: { type: String, required: true },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Note = mongoose.model('Note', noteSchema)
module.exports= Note