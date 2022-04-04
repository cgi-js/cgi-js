// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

// Config based Recursive usage

const fs = require('fs');
const express = require('express');
const URL = require('url');
const path = require("path");
const cgijs = require("../../src");
// const cgijs = require("cgijs");

var app = express();

var cgiapps = require("./recursive/cgifiles_recursive");
var proxyapps = require("./recursive/proxy_recursive")();

app.use(proxyapps.app);
app.use(cgiapps);

app.use("*", function (req, res) {
    res.send(`"Testing my server recursive"`);
});

let server = app.listen(9090, '127.0.0.1', function () {
    console.log(`Server listening at 9090`);
});

let s = proxyapps.servers;

process.on("SIGINT", function() {
    let k = Object.keys(s);
    let l = k.length;
    for (let i = 0; i < l; i++) {
        s[k[i]]["remote"]["server"].close(function() {
            console.log("Closing remote proxy server: ", k[i]);
        });
    }
    server.close(function() {
        console.log("Closing server");
        process.exit(1);
    });
}.bind(server, s))
