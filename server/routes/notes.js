const express = require("express");
const notesRouter = express.Router();

notesRouter.get('/')
notesRouter.get('/:id')
notesRouter.post('/');
notesRouter.put('/:id');
notesRouter.delete('/:id');
notesRouter.post('/:id/share');
notesRouter.get('/search');


module.exports = notesRouter;
