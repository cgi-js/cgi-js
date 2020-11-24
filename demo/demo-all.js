// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

const express = require('express');
const URL = require('url');
const path = require("path");
const cgijs = require("../src");
// const cgijs = require("cgijs");

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
    "options": {
        "target": {
            "protocol": "http:",
            "host": "127.0.0.1",
            "port": 9001,
            "pfx": null,
            "passphrase": ""
        },
        "ws": false,
        "secure": false,
        "xfwd": true,
        "toProxy": true,
        "prependPath": true,
        "ignorePath": false,
        "changeOrigin": false,
        "preserveHeaderKeyCase": true,
        "auth": ":",
        "hostRewrite": true,
        "protocolRewrite": null,
        "cookieDomainRewrite": false,
        "cookiePathRewrite": false,
        "headers": {},
        "proxyTimeout": 10000,
        "timeout": 10000,
        "selfHandleResponse": false,
        "buffer": null,
        "ssl": {
            "key": null,
            "cert": null
        }
    },
    "listenPort": 8001,
    "stream": false,
    "modify": false,
    "runtime": false
};

// Sample Proxy Server (You have the option to avoid this all together)
var remoteProxy = require("./recursive/remoteproxy")(config.options.target.port);

function proxyHandler(handler, config) {
    handler.proxy.setup("proxyone", config, {})
    let proxy = handler.proxy.serve("proxyone");
    return function (req, res, next) {
        proxy.proxy.web(req, res)
    }
}
app.use("/proxyone", proxyHandler(cgijs.handler(), config));


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

// PHP File: Use bin as string
app.use("/php", response('php', { web_root_folder: php, bin: php_bin, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PHP File: Use bin as object definition
app.use("/phpud", response('php', { web_root_folder: php, bin: { bin_path: '', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PHP File: Use bin as Object definition with useDefault false
app.use("/phpnud", response('php', { web_root_folder: php, bin: { bin_path: php_bin, useDefault: false }, config_path: '', host: shost, port: sport, cmd_options: {} }));

// RB File
app.use("/rb", response('rb', { web_root_folder: rby, bin: rby_bin, config_path: '', host: shost, port: sport, cmd_options: {} }));
// RB File
app.use("/rbud", response('rb', { web_root_folder: rby, bin: { bin_path: rby_bin, useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));

// PLC File
app.use("/plc", response('plc', { web_root_folder: pl, bin: { bin_path: pl_bin, useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PLD File
app.use("/pld", response('pld', { web_root_folder: pl, bin: { bin_path: pl_bin, useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PL File
app.use("/pl", response('pl', { web_root_folder: pl, bin: { bin_path: pl_bin, useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));

// PYTHON File
app.use("/py", response('py', { web_root_folder: py, bin: { bin_path: py_bin, useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PYTHON3 File
app.use("/py3", response('py3', { web_root_folder: py, bin: { bin_path: py_bin, useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));

app.use("*", function (req, res) {
    res.send(`
        "Testing my server"
    `);
});

app.listen(sport, shost);
console.log(`Server listening at ${sport}!`);
