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

let php = path.join("www/php");
let rby = path.join("www/ruby");
let pl = path.join("www/perl");
let py = path.join("www/py");
let sport = 9090, shost = '127.0.0.1';

let config = {
    host: 'http://127.0.0.1',
    port: 8000,
    cbase: 'http://127.0.0.1',
    cport: 5000,
    curl: '/*',
    chttps: {
        key: null,
        cert: null
    }
};

function proxyHandler(cgijs, config) {
    let h = cgijs.handler();
    let proxy = cgijs.proxy();
    const conn = h.startProxy({}, { basehost: config.cbase, baseport: config.cport, baseurl: config.curl, host: config.host, port: config.port, https: config.chttps });
    // h.setConn(config, conn);
    return proxy.setup(h, proxy, config);
}

// Subsystem for proxyHandler
app.use("/sub", proxyHandler(cgijs, config));

// PHP File
app.use("/php", cgi.serve('php', { web_files_root: php, bin_path: '', config_path: '', host: shost, port: sport }));
// RB File
app.use("/rb", cgi.serve('rb', { web_files_root: rby, bin_path: '/usr/bin/', config_path: '', host: shost, port: sport }));
// PLC File
app.use("/plc", cgi.serve('plc', { web_files_root: pl, bin_path: '/usr/bin/', config_path: '', host: shost, port: sport }));
// PLD File
app.use("/pld", cgi.serve('pld', { web_files_root: pl, bin_path: '/usr/bin/', config_path: '', host: shost, port: sport }));
// PL File
app.use("/pl", cgi.serve('pl', { web_files_root: pl, bin_path: '/usr/bin/', config_path: '', host: shost, port: sport }));
// PYTHON File
app.use("/py", cgi.serve('py', { web_files_root: py, bin_path: '/usr/bin/', config_path: '', host: shost, port: sport }));
// PYTHON3 File
app.use("/py3", cgi.serve('py3', { web_files_root: py, bin_path: '/usr/bin/', config_path: '', host: shost, port: sport }));

app.use("/", function (req, res) {
    res.send(`
        "Testing my server"
    `);
});

app.listen(sport, shost);
console.log(`Server listening at ${sport}!`);

// // Run flask application
// FLASK_APP=main.py FLASK_ENV=development flask run
