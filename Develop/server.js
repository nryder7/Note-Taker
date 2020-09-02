const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
//var util = require("util");
const dataBase = require("./db/db.json")
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); //how does this display initial page?
//app.use('/static', express.static(path.join(__dirname, 'public'))) use when use Heroku?

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", function (req, res) {

    var newNote = req.body;

    console.log (newNote);
    dataBase.push(newNote);

    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(dataBase), function(err) {
     if(err) throw err;  
     res.json([dataBase])
     });
   
});

// app.post("/api/notes", function (req, res) {
//     req.
// }


// app.get("/notes", function (req, res) {
//     res.sendFile(path.join(__dirname, "./public/notes.html"));
// });


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});