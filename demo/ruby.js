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
let ruby_bin = configuration.rb.embed.bin
let ruby_www = configuration.rb.script.path

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

// RB File
app.use("/rb", response('rb', { web_root_folder: ruby_www, bin: ruby_bin, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));
// RB File
app.use("/rbud", response('rb', { web_root_folder: ruby_www, bin: { bin_path: ruby_bin, useDefault: true }, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));

module.exports = app;
