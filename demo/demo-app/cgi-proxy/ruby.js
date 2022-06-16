// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

const fs = require('fs');
const os = require("os");
const express = require('express');
const URL = require('url');
const path = require("path");
const cgijs = require("../../../src");
// const cgijs = require("cgijs");

var cgi = cgijs.init();
var app = express();

const ostype = os.type();
var configuration;

if (ostype === "Linux") {
    configuration = JSON.parse(fs.readFileSync('./demo/demo-app/config-linux.json'));
} else if (ostype === "Windows_NT") {
    configuration = JSON.parse(fs.readFileSync('./demo/demo-app/config-win.json'));
} else if (ostype === "Darwin") {
    configuration = JSON.parse(fs.readFileSync('./demo/demo-app/config-mac.json'));
}

let ruby_bin = (typeof configuration.rb.embed.bin === "string") ? configuration.rb.embed.bin : configuration.rb.embed.bin.bin_path;
let ruby_www = configuration.rb.script.path;
let ruby_config = configuration.rb.embed.config.file;
let ruby_cmd_options = configuration.rb.script.options;

function response(type, exeOptions) {
    var cgi = cgijs.init();
    return function (req, res, next) {
        let requestObject = {
            url: URL.parse(req.originalUrl),
            originalUrl: req.originalUrl,
            query: req.url.query,
            method: req.method,
            body: req.body,
            ip: req.ip,
            headers: req.headers
        }
        cgi.serve(type, requestObject, exeOptions).then(function (result) {
            result.statusCode = (!result.statusCode) ? 200 : result.statusCode;
            res.status(result.statusCode).send(result.response);
        }.bind(res)).catch(function (e) {
            e.statusCode = (!e.statusCode) ? 500 : e.statusCode;
            res.status(e.statusCode).send(e.response);
        });
    };
}

// RB File
app.use("/rb", response('rb', { web_root_folder: ruby_www, bin: ruby_bin, config_path: ruby_config, host: configuration.server.host, port: configuration.server.port, cmd_options: ruby_cmd_options }));
// RB File
app.use("/rbud", response('rb', { web_root_folder: ruby_www, bin: { bin_path: ruby_bin, useDefault: (typeof configuration.rb.embed.bin === "string") ? true : configuration.rb.embed.bin.useDefault }, config_path: ruby_config, host: configuration.server.host, port: configuration.server.port, cmd_options: ruby_cmd_options }));
// RB File with useDefault as false
app.use("/rbnud", response('rb', { web_root_folder: ruby_www, bin: { bin_path: ruby_bin, useDefault: (typeof configuration.rb.embed.bin === "string") ? false : configuration.rb.embed.bin.useDefault }, config_path: ruby_config, host: configuration.server.host, port: configuration.server.port, cmd_options: ruby_cmd_options }));

module.exports = app;
