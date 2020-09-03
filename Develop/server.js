const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
//var util = require("util");
var dataBase = require("./db/db.json")
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
    // newNote.id = JSON.stringify(dataBase.uuidv4());
    newNote.id = JSON.stringify(Math.random());
    dataBase.push(newNote);

    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(dataBase), function (err) {
        if (err) throw err;
        res.json([dataBase])
    });

});

app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function(err, data) {
    if (err) {
        throw err;
    }
    else {
        dataBase = JSON.parse([data])
        dataBase = dataBase.filter(function (dataBase) {
            return dataBase.id !== req.params.id;
        });

        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify([...dataBase]), "utf8", function (err) {
            if (err) throw err;
            res.json([dataBase])
        });
        
    }
});
});



// fs.readFile("./db/db.json", "utf8", function(err, data) {
//      if(err) {
//          throw err;
//      }
//      else {
//          dataBase = JSON.parse([data])
//          console.log(dataBase);
//          console.log("------------");
//          dataBase = dataBase.filter(function(dataBase) {
//             return dataBase.id !== '3';

//         });
//         console.log(dataBase);
//         fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(dataBase), function(err) {
//             if(err) throw err;  
//             // res.json([dataBase])
//             });

//      }
// });


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});