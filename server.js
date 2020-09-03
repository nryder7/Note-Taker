const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
//const { v4: uuidv4 } = require('uuid');
//var util = require("util");
var dataBase = require("./db/db.json")
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
//app.use('/static', express.static(path.join(__dirname, 'public'))) use when use Heroku?

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", function (req, res) {

    var newNote = req.body;
    newNote.id = JSON.stringify(Math.random());
    dataBase.push(newNote);

    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(dataBase), function (err) {
        if (err) throw err;
        res.json([dataBase])
    });

});

app.delete("/api/notes/:id", function (req, res) {

    dataBase = dataBase.filter(function (dataBase) {
        return dataBase.id !== req.params.id;
    });

    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(dataBase), function (err) {
        if (err) throw err;
        res.json(dataBase)
    });
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
