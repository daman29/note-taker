const notes = require("express").Router().get("notes");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

var notesArray = [];

notes.get("/", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.error(err);
    }
    if (data.length > 0) {
      notesArray = JSON.parse(data);
    }
    res.json(notesArray);
  });
  console.log(notesArray);
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    notesArray.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(notesArray), (err) => {
      if (err) {
        console.error(err);
      } else {
        res.json(notesArray);
        console.log("Note added successfully");
      }
    });
  } else {
    res.error("Error in saving note");
  }
});

notes.delete("/:id", (req, res) => {
    const noteId = req.params.id;
    console.log(noteId);
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.error(err);
    }else{
        notesArray = JSON.parse(data);
    }
  });

  notesArray.forEach((note,idx) => {
      if(note.id === noteId){
          notesArray.splice(idx, 1);
      }
  })

  fs.writeFile("./db/db.json", JSON.stringify(notesArray), (err) => {
    if (err) {
      console.error(err);
    } else {
      res.json(notesArray);
      console.log("Note added successfully");
    }
  });

});

module.exports = notes;
