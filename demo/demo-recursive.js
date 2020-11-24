const fs = require('fs');
const express = require('express');
const URL = require('url');
const path = require("path");
const cgijs = require("../src");
// const cgijs = require("cgijs");

var app = express();

var cgiapps = require("./recursive/cgifiles_recursive");
var proxyapps = require("./recursive/proxy_recursive")();

app.use(proxyapps.app);
app.use(cgiapps);

app.use("*", function (req, res) {
    res.send(`"Testing my server recursive"`);
});

app.listen(9090, '127.0.0.1', function () {
    console.log(`Server listening at 9090`);
});
