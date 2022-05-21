const notes = require('express').Router().get('notes');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

var notesArray = [];

fs.readFile('./db/db.json', (err, data) => {
    if(err){
        console.error(err)
    }else{
        notesArray = JSON.parse(data)
    }

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
    const {title, text} = req.body
    console.log(title, text)

    if(req.body){
        const newNote = {
            title, 
            text,
            note_id: uuidv4()
        }
        notesArray.push(newNote)
        console.log(notesArray)
    }

})

module.exports = notes;