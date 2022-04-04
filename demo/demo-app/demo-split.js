// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

// Config based Split usage

const fs = require('fs');
const os = require("os");
const express = require('express');

const ostype = os.type();
var configuration;

if (ostype == "Linux") {
    configuration = JSON.parse(fs.readFileSync('./demo/demo-app/config-linux.json'));
} else if (ostype == "Windows_NT") {
    configuration = JSON.parse(fs.readFileSync('./demo/demo-app/config-win.json'));
} else if (ostype == "Darwin") {
    configuration = JSON.parse(fs.readFileSync('./demo/demo-app/config-mac.json'));
}

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

let server = app.listen(port, host, function() {
    console.log(`Server listening at ${port}!`);
});

process.on("SIGINT", function() {
    proxy.remoteProxy.server.close(function() {
        console.log("Closing remote proxy server");
        server.close(function() {
            console.log("Closing server");
            process.exit(1)
        });
    });
}.bind(server, proxy));
