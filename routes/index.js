const express = require('express');
// declaring the notes router
const notesRouter = require('./notes')

const app = express();
// declaring the notes endpoint
app.use('/notes', notesRouter)

module.exports = app