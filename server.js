// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

var express = require('express');
var cgijs = require("./src");
var cgi = cgijs.serve();

// var cgi = require("cgijs");
var path = require("path");

var app = express();

var php = path.join("www/php");
var rby = path.join("www/ruby");
var pl = path.join("www/perl");
var py = path.join("www/py");

let config = {
    host: 'http://127.0.0.1:8000/',
    cbase: 'http://127.0.0.1:5000',
    curl: '/*',
    cport: 8000,
    chttps: {
        key: null,
        cert: null
    }
};

function proxyHandler(cgijs, config) {
    let h = cgijs.handler();
    let proxy = cgijs.proxy();
    const conn = h.startProxy({}, { base: config.cbase, url: config.curl, port: config.cport, https: config.chttps });
    // h.setConn(config, conn);
    return proxy.setup(h, proxy, config);
}

// Subsystem for proxyHandler
app.use("/sub", proxyHandler(cgijs, config));

// PHP File
app.use("/php", cgi.serve('php', { web_files_root: php }));
// RB File
app.use("/rb", cgi.serve('rb', { web_files_root: rby }));
// PLC File
app.use("/plc", cgi.serve('plc', { web_files_root: pl }));
// PLD File
app.use("/pld", cgi.serve('pld', { web_files_root: pl }));
// PL File
app.use("/pl", cgi.serve('pl', { web_files_root: pl }));
// PYTHON File
app.use("/py", cgi.serve('py', { web_files_root: py }));
// PYTHON3 File
app.use("/py3", cgi.serve('py3', { web_files_root: py }));

app.use("/", function (req, res) {
    res.send(`
        "Testing my server"
    `)
});

app.listen(9090, '127.0.0.1');
console.log("Server listening at 9090!");

// // Run flask application
// FLASK_APP=main.py FLASK_ENV=development flask run
