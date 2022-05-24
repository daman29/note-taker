// Declaring constants for required modules
const express = require("express");
const path = require("path");
// constant declaration for the routes file
const api = require("./routes/index.js");
// constant declaration for the port
const PORT = process.env.PORT || 3001;

// declare the app constant
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// route declaration for the '/api' route
app.use("/api", api);

app.use(express.static("public"));

// get request for the notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// get request for a wildcard route to get index
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
