// Dependencies
const express = require('express');
const path = require('path');
const fs = require("fs");
const noteText = require("./db/db.json");
const { v4: uuidv4 } = require('uuid');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing and to read static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


// API ROUTES

// Reads db.json file and returns all saved notes as JSON
app.get("/api/notes", (req, res) => {
    console.log("text in get:", JSON.stringify(noteText))
    return res.json(noteText);
  });

// // Receives a new note to save on the request body and adds to db.json file and returns note to client
// app.post("/api/notes", (req, res) => {


//    let input = JSON.stringify(req.body);

//    let postId = uuidv4();

//    // create a new object with what is in the object that has new post + new id 1) read file, .then write file
//     fs.readFile ("./db/db.json", (err, data) => {
//       console.log("text in post:", JSON.stringify(noteText))
//     });

//       // . then 

//     // fs.writeFile("./db/db.json",input);
    

//     // console.log("input:", input)
//     // res.json(input);
// });

//https://www.codota.com/code/javascript/functions/express/Router/delete
// Receives query parameter containing ID of the note to delete. 
// Get all the notes from the database with a read file and use filter function .filter to filter out the id and write back to the file minus the one that was filtered out 
app.delete("/api/notes/:id"), (req, res) => {
  console.log("DELETE")
  let id = parseInt(req.params.id);
    delete noteText[id];
}



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