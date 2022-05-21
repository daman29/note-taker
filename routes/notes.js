const notes = require('express').Router().get('notes');
const fs = require('fs');

notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
        }else {
            res.json(JSON.parse(data));
        }
    })
})

module.exports = notes;