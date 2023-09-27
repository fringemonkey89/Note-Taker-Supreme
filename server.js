const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
let notes = require("./db/db.json");
const PORT = process.env.PORT || 3001;
const app = express();
const uniqid = require("uniqid");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));




//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//used to serve the static files from the public directory

app.use(express.static('public'));

//defines the route for the root url using app.get(), it responds by sending the index file from the public directory 
//using res.sendFile();
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//defines the route for the /notes url using app.get(), it responds by sending the notes file from the public directory 
//using res.sendFile();
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html')));

//defines the route for the /api/notes url using app.get(), it responds by sending the db JSON file as the response  
//using res.json();. used to retrieve notes from the JSON database
app.get('/api/notes', (req, res) => 
res.json(db));

//defines a route for the /api/notes url using app.post. it expects the incoming requests with a JSON body containing
// title and text properties
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    //creates a new note object using values from the request body
    const newNote = {title, text};
    //new note is then pushed to the db.json file using fs.writeFileSync
    db.push(newNote);
    fs.writeFileSync("db/db.json", JSON.stringify(db))
    //responds by sending the updated db JSON object as the response using res.json
    res.json(db);
  })
    
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );
