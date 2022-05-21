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

    if(req.body){
        const newNote = {
            title, 
            text,
            note_id: uuidv4()
        }
        notesArray.push(newNote)
        
        fs.writeFile('./db/db.json',JSON.stringify(notesArray),(err) => {
            if (err) {
                console.error(err)
            }else{
                res.json(notesArray)
                console.log('Note added successfully')
            }
        })



    }else{
        res.error('Error in saving note')
    }

})

module.exports = notes;