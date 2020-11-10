// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

const fs = require('fs');
var express = require('express');
var cgijs = require("../src");
var cgi = cgijs.init();

// var cgi = require("cgijs");
var path = require("path");
var app = express();

let conf = fs.readFileSync('./config.json');
let configuration = JSON.parse(conf);
let py_bin = configuration.py.embed.bin
let py_www = './www/py/'


// PYTHON File
app.use("/py", cgi.serve('py', { web_root_folder: py_www, bin: { bin_path: py_bin, useDefault: true }, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));
// PYTHON3 File
app.use("/py3", cgi.serve('py3', { web_root_folder: py_www, bin: { bin_path: py_bin, useDefault: true }, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));

module.exports = app;
