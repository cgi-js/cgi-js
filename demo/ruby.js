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
let ruby_bin = configuration.rb.embed.bin
let ruby_www = './www/ruby/'


// RB File
app.use("/rb", cgi.serve('rb', { web_root_folder: ruby_www, bin: ruby_bin, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));
// RB File
app.use("/rbud", cgi.serve('rb', { web_root_folder: ruby_www, bin: { bin_path: ruby_bin, useDefault: true }, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));

module.exports = app;
