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

let pl_bin = (typeof configuration.pl.embed.bin === "string") ? configuration.pl.embed.bin : configuration.pl.embed.bin.bin_path;
let pl_www = configuration.pl.script.path;
let pl_config = configuration.pl.embed.config.file;
let pl_cmd_options = configuration.pl.script.options;

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

// PLC File
app.use("/plc", response('plc', { web_root_folder: pl_www, bin: { bin_path: pl_bin, useDefault: (typeof configuration.pl.embed.bin === "string") ? true : configuration.pl.embed.bin.useDefault }, config_path: pl_config, host: configuration.server.host, port: configuration.server.port, cmd_options: pl_cmd_options }));
// PLD File
app.use("/pld", response('pld', { web_root_folder: pl_www, bin: { bin_path: pl_bin, useDefault: (typeof configuration.pl.embed.bin === "string") ? true : configuration.pl.embed.bin.useDefault }, config_path: pl_config, host: configuration.server.host, port: configuration.server.port, cmd_options: pl_cmd_options }));
// PL File
app.use("/pl", response('pl', { web_root_folder: pl_www, bin: { bin_path: pl_bin, useDefault: (typeof configuration.pl.embed.bin === "string") ? true : configuration.pl.embed.bin.useDefault }, config_path: pl_config, host: configuration.server.host, port: configuration.server.port, cmd_options: pl_cmd_options }));
// PLC File with useDefault as false
app.use("/plcnud", response('plc', { web_root_folder: pl_www, bin: { bin_path: pl_bin, useDefault: (typeof configuration.pl.embed.bin === "string") ? false : configuration.pl.embed.bin.useDefault }, config_path: pl_config, host: configuration.server.host, port: configuration.server.port, cmd_options: pl_cmd_options }));
// PLD File with useDefault as false
app.use("/pldnud", response('pld', { web_root_folder: pl_www, bin: { bin_path: pl_bin, useDefault: (typeof configuration.pl.embed.bin === "string") ? false : configuration.pl.embed.bin.useDefault }, config_path: pl_config, host: configuration.server.host, port: configuration.server.port, cmd_options: pl_cmd_options }));
// PL File with useDefault as false
app.use("/plnud", response('pl', { web_root_folder: pl_www, bin: { bin_path: pl_bin, useDefault: (typeof configuration.pl.embed.bin === "string") ? true : configuration.pl.embed.bin.useDefault }, config_path: pl_config, host: configuration.server.host, port: configuration.server.port, cmd_options: pl_cmd_options }));

module.exports = app;
