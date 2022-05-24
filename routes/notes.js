const notes = require("express").Router().get("notes"); // declaring the notes endpoint
const fs = require("fs"); // file system library
const { v4: uuidv4 } = require("uuid"); // unique identifier library

// empty notes array to store all notes objects
var notesArray = [];

// GET request for '/api/notes' endpoint to get all notes from db
notes.get("/", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    // if there is an error then return error else return notes
    if (err) {
      console.error(err);
    } else {
      // if there are no notes saved then print empty array otherwise return data to array
      if (data.length > 0) {
        notesArray = JSON.parse(data);
      }
      res.json(notesArray);
    }
  });
});

// POST request for '/api/notes' endpoint to save notes to database
notes.post("/", (req, res) => {
  // read the title and text from the request body
  const { title, text } = req.body;

  // if request body is not empty then save the notes else return error
  if (req.body) {
    // create new note object (newNote) to store the title, text and unique id
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    // push the new note object to the notes array
    notesArray.push(newNote);

    // write the notesArray to the database
    writeDatabase(notesArray, res);
  } else {
    res.error("Error in saving note");
  }
});

// DELETE request for '/api/notes endpoint with :id parameter
notes.delete("/:id", (req, res) => {
  // saves id as a constant variable
  const noteId = req.params.id;

  // reads the database and updates the notes array
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      notesArray = JSON.parse(data);
      // runs a forEach loop to find and remove the note object with the given id
      notesArray.forEach((note, idx) => {
        if (note.id === noteId) {
          notesArray.splice(idx, 1);
        }
      });
      // once the note object has been removed the array is re-written to the database
      writeDatabase(notesArray, res);
    }
  });
});

// writeDatabase function to write the notes array to the database and write a json response
const writeDatabase = (notesArr, response) => {
  fs.writeFile("./db/db.json", JSON.stringify(notesArr), (err) => {
    if (err) {
      console.error(err);
    } else {
      response.json(notesArr);
      console.log("Changes made successfully");
    }
  });
};

module.exports = notes;
