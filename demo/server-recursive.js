const fs = require('fs');
const express = require('express');
const cgijs = require("../src/index");
const path = require("path");

var cgi = cgijs.init();
var app = express();
let cgiapps = require("./cgifiles_recursive");

app.use(cgiapps);

app.use("*", function (req, res) {
    res.send(`"Testing my server"`);
});

app.listen(3001, '127.0.0.1', function () {
    console.log(`Server listening at 3001`);
    
});
