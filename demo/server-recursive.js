const fs = require('fs');
const express = require('express');
const URL = require('url');
const path = require("path");
const cgijs = require("../src");
// const cgijs = require("cgijs");

var app = express();

var cgiapps = require("./cgifiles_recursive");
var proxyapps = require("./proxy_recursive")();

app.use(proxyapps.app);
app.use(cgiapps);

app.use("*", function (req, res) {
    res.send(`"Testing my server recursive"`);
});

app.listen(3001, '127.0.0.1', function () {
    console.log(`Server listening at 3001`);
});
