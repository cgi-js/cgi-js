// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

const fs = require('fs');
var express = require('express');
var cgijs = require("../src");
var cgi = cgijs.init();

var path = require("path");
var app = express();

let conf = fs.readFileSync('./config.json');
let configuration = JSON.parse(conf);
let pl_bin = configuration.pl.embed.bin
let pl_www = configuration.pl.script.path

// PLC File
app.use("/plc", cgi.serve('plc', { web_root_folder: pl_www, bin: { bin_path: pl_bin, useDefault: true }, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));
// PLD File
app.use("/pld", cgi.serve('pld', { web_root_folder: pl_www, bin: { bin_path: pl_bin, useDefault: true }, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));
// PL File
app.use("/pl", cgi.serve('pl', { web_root_folder: pl_www, bin: { bin_path: pl_bin, useDefault: true }, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));

module.exports = app;
