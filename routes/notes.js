const notes = require('express').Router().get('notes');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

var notesArray = [];

fs.readFile('./db/db.json', (err, data) => {
    notesArray = JSON.parse(data)
})

notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
        }else {
            res.json(JSON.parse(data));
        }
    })
})

notes.post('/', (req, res) => {
    notesArray.push(req.body)
    console.log(notesArray)
})

module.exports = notes;