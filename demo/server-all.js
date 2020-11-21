// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

var express = require('express');
var cgijs = require("../src");
var cgi = cgijs.init();

// var cgi = require("cgijs");
var path = require("path");

var app = express();

let php_bin = path.join("F:/languages/php");
let rby_bin = path.join("F:/languages/Rails/Ruby2.3.3/bin");
let pl_bin = path.join("F:/languages/perl/bin");
let py_bin = path.join("F:/languages/py");

let php = path.join("www/php");
let rby = path.join("www/ruby");
let pl = path.join("www/perl");
let py = path.join("www/py");
let sport = 9090, shost = '127.0.0.1';

let config = {
    proxy_host: 'http://127.0.0.1',
    proxy_port: 8000,
    remote_host: 'http://127.0.0.1',
    remote_port: 80,
    remote_url: '/*',
    https: {
        key: null,
        cert: null
    }
};

function proxyHandler(cgijs, config) {
    let h = cgijs.handler();
    const conn = h.proxy.start({}, config);
    // h.setter.connection({config.cbase + config.cport.toString(): conn});
    return h.proxy.setup(h, config, h.proxy.serve);
}

// Subsystem for proxyHandler
app.use("/sub", proxyHandler(cgijs, config));


// PHP File: Use bin as string
app.use("/php", cgi.serve('php', { web_root_folder: php, bin: php_bin, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PHP File: Use bin as object definition
app.use("/phpud", cgi.serve('php', { web_root_folder: php, bin: { bin_path: '', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PHP File: Use bin as Object definition with useDefault false
app.use("/phpnud", cgi.serve('php', { web_root_folder: php, bin: { bin_path: php_bin, useDefault: false }, config_path: '', host: shost, port: sport, cmd_options: {} }));

// RB File
app.use("/rb", cgi.serve('rb', { web_root_folder: rby, bin: rby_bin, config_path: '', host: shost, port: sport, cmd_options: {} }));
// RB File
app.use("/rbud", cgi.serve('rb', { web_root_folder: rby, bin: { bin_path: rby_bin, useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));

// PLC File
app.use("/plc", cgi.serve('plc', { web_root_folder: pl, bin: { bin_path: pl_bin, useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PLD File
app.use("/pld", cgi.serve('pld', { web_root_folder: pl, bin: { bin_path: pl_bin, useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PL File
app.use("/pl", cgi.serve('pl', { web_root_folder: pl, bin: { bin_path: pl_bin, useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));

// PYTHON File
app.use("/py", cgi.serve('py', { web_root_folder: py, bin: { bin_path: py_bin, useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PYTHON3 File
app.use("/py3", cgi.serve('py3', { web_root_folder: py, bin: { bin_path: py_bin, useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));

app.use("*", function (req, res) {
    res.send(`
        "Testing my server"
    `);
});

app.listen(sport, shost);
console.log(`Server listening at ${sport}!`);

// // Run flask application
// FLASK_APP=./www/py/main.py FLASK_ENV=development flask run
