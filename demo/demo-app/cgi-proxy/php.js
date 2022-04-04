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

let php_bin = configuration.php.embed.bin
let php_www = configuration.php.script.path

function response(type, exeOptions) {
    const cgijs = require("../../../src");
    // const cgijs = require("cgijs");
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

// PHP File: Use bin as string
app.use("/php", response('php', { web_root_folder: php_www, bin: php_bin, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));
// PHP File: Use bin as object definition
app.use("/phpud", response('php', { web_root_folder: php_www, bin: { bin_path: '', useDefault: true }, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));
// PHP File: Use bin as object definition with useDefault false
app.use("/phpnud", response('php', { web_root_folder: php_www, bin: { bin_path: '', useDefault: false }, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));
// PHP File: Use bin as Object definition with useDefault false
app.use("/phpnudd", response('php', { web_root_folder: php_www, bin: { bin_path: php_bin, useDefault: false }, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));
// PHP File: Use bin as Object definition with useDefault true
app.use("/phpudd", response('php', { web_root_folder: php_www, bin: { bin_path: php_bin, useDefault: true }, config_path: '', host: configuration.server.host, port: configuration.server.port, cmd_options: {} }));

module.exports = app;

