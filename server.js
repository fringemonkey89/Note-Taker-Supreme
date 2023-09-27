const express = require('express');
const path = require('path');
const fs = require('fs');
let notes = require("./db/db.json");
const PORT = process.env.PORT || 3001;
const app = express();
const uniqid = require("uniqid");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


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
app.get('/api/notes', (req, res) => {
res.json(notes)});

//defines a route for the /api/notes url using app.post
app.post('/api/notes', (req, res) => {
    req.body.id = uniqid();
    notes.push(req.body);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2))
    res.json(notes);
  })

  app.delete("/api/notes/:id", (req, res) => {
    notes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notes, null, 2)
    );
    res.json(notes);
});

    
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );
