var express = require('express');
var cgi = require("./main"); 
// var cgi = require("cgijs");
var path = require("path"); 

var app = express();

var php = path.join("tests/php")
var rby = path.join("tests/ruby")
var pl = path.join("tests/perl")
var py = path.join("tests/py")

// PHP File
app.use("/php", cgi.serve('php', php));
// RB File
app.use("/rb", cgi.serve('rb', rby));
// PLC File
app.use("/plc", cgi.serve('plc', pl));
// PLD File
app.use("/pld", cgi.serve('pld', pl));
// PL File
app.use("/pl", cgi.serve('pl', pl));
// PYTHON File
app.use("/py", cgi.serve('py', py));
// PYTHON3 File
app.use("/py3", cgi.serve('py3', py));

app.use("/", function(req, res){
    res.send(`
        "Testing my server"
    `)
});

app.listen(9090, '127.0.0.1');
console.log("Server listening at 9090!");
