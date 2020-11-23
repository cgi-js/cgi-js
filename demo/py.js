// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

const fs = require('fs');
var express = require('express');
const URL = require('url');
var cgijs = require("../src");
var cgi = cgijs.init();

// var cgi = require("cgijs");
var path = require("path");
var app = express();

let conf = fs.readFileSync('./demo/config.json');
let configuration = JSON.parse(conf);
let py_bin = configuration.py.embed.bin
let py_www = configuration.py.script.path

function response(type, exeOptions) {
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
            result.statusCode = (!result.statusCode) ? 500 : result.statusCode;
            res.status(result.statusCode).send(result.response);
        });
    };
}

// PYTHON File
app.use("/py", response('py', { web_root_folder: py_www, bin: { bin_path: py_bin, useDefault: true }, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));
// PYTHON3 File
app.use("/py3", response('py3', { web_root_folder: py_www, bin: { bin_path: py_bin, useDefault: true }, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));

module.exports = app;
