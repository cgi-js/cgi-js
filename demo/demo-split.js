// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

const fs = require('fs');
const express = require('express');

var configuration = JSON.parse(fs.readFileSync('./demo/config.json'));
var { host, port } = configuration.server;
var app = express();

let php = require("./cgi-proxy/php");
app.use(php);
let rb = require("./cgi-proxy/ruby");
app.use(rb);
let py = require("./cgi-proxy/py");
app.use(py);
let pl = require("./cgi-proxy/pl");
app.use(pl);
let proxy = require("./cgi-proxy/proxy");
app.use(proxy.app);

app.use("*", function (req, res) {
    res.send(`
        "Testing my server"
    `);
});

app.listen(port, host);
console.log(`Server listening at ${port}!`);
