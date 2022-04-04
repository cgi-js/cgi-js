'use strict';

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

let cgifiles = Object.keys(configuration.cgifiles);

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

// TODO:
//      Write Tests
for (let i = 0; i < cgifiles.length; i++) {
    let inst = configuration.cgifiles[cgifiles[i]];
    app.use(
        inst.path,
        response(inst.lang_type, {
            web_root_folder: inst.web_root_folder,
            bin: inst.bin,
            config_path: inst.config_path,
            host: inst.host,
            port: inst.port,
            cmd_options: inst.cmd_options
        })
    );
}

module.exports = app;
