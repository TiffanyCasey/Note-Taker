// Dependencies
const express = require('express');
const path = require('path');
const fs = require("fs");
const noteText = require(__dirname, "/db/db.json");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing and to read static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

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

// API ROUTES

// Reads db.json file and returns all saved notes as JSON
app.get("/api/notes", (req, res) => {
    return res.json(noteText);
  });

// Receives a new note to save on the request body and adds to db.json file and returns note to client
app.post("/api/notes"),(req, res) => {
    fs.writeFileSync("/public/notes.html", noteText(noteText));
    
    if (err) {
      throw err;
    }
};


//https://www.codota.com/code/javascript/functions/express/Router/delete
// Receives query parameter containing ID of the note to delete. 
app.delete("/api/notes/:id"), (req, res) => {
  let id = parseInt[req.params.id];
    delete noteText[id];
}

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log('App listening on PORT: ' + PORT);
});