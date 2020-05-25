// Dependencies
const express = require('express');
const path = require('path');
const fs = require("fs");
const db = require("./db/db.json");
const crypto = require("crypto");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 9080;

// Sets up the Express app to handle data parsing and to read static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


// API ROUTES

// Reads db.json file and returns all saved notes as JSON
app.get("/api/notes", (req, res) => {
    return res.json(db);
  });

// Receives a new note to save on the request body and adds to db.json file and returns note to client
app.post("/api/notes", (req, res) => {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json")); // reads db.json
  let id = crypto.randomBytes(16).toString("hex"); // creates unique ID for each note 
  let newNote = { // creates a new note object with the ID 
    title: req.body.title,
    text: req.body.text, 
    id: id,
  }

  console.log("newNote:", newNote)

    // pushes the new notes to the notes.index page 
    savedNotes.push(newNote);

    // writes all new notes to db.json
    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) => {
    if (err) throw err; 
    res.json(savedNotes);
    });
    console.log("new note has been written");
});

https://stackoverflow.com/questions/52909217/how-to-delete-by-id-in-node-js/52909282
// Receives query parameter containing ID of the note to delete. 
// Get all the notes from the database with a read file and use filter function .filter to filter out the id and write back to the file minus the one that was filtered out 
app.delete("/api/notes/:id", (req, res) => {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json")); // reads db.json
  let noteID = savedNotes.filter(x=>x.id!=req.params.id) // returns route with all notes EXCEPT the ID we are deleting 

  console.log("NOTE ID", noteID)
  console.log("REQ.PARAMS.ID", req.params.id)

  // writes all new notes to db.json
  fs.writeFile("./db/db.json", JSON.stringify(noteID), (err) => {
   if (err) throw err; 
   res.json(savedNotes);
   });
   console.log("Delete note");
});

// HTML ROUTES

// returns notes.html file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  console.log("notes")
});

// returns index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  console.log("html")
});

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log('App listening on PORT: ' + PORT);
});