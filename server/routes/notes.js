const express = require("express");
const { protect } = require("../middlewares/authentication");
const {createNote} = require('../controller/notes')
const notesRouter = express.Router();

notesRouter.get("/", protect, createNote);
notesRouter.get('/:id')
notesRouter.post("/", protect, createNote);
notesRouter.put('/:id');
notesRouter.delete('/:id');
notesRouter.post('/:id/share');
notesRouter.get('/search');


module.exports = notesRouter;
