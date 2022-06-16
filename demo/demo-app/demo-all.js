// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

// Config based Usage - All ways

const express = require('express');
const URL = require('url');
const fs = require('fs');
const os = require('os');
const path = require("path");
const cgijs = require("../../src");
// const cgijs = require("cgijs");

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

let php_bin = configuration.php.embed.bin;
let rby_bin = configuration.rb.embed.bin;
let pl_bin = configuration.pl.embed.bin;
let py_bin = configuration.py.embed.bin;

let php = configuration.php.script.path;
let rby = configuration.rb.script.path;
let pl = configuration.pl.script.path;
let py = configuration.py.script.path;

let php_config = configuration.php.embed.config;
let rby_config = configuration.rb.embed.config;
let pl_config = configuration.pl.embed.config;
let py_config = configuration.py.embed.config;

let php_cmd_options = configuration.php.script.cmd_options;
let rby_cmd_options = configuration.rb.script.cmd_options;
let pl_cmd_options = configuration.pl.script.cmd_options;
let py_cmd_options = configuration.py.script.cmd_options;


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
var remoteProxy = require("./remote/remote-proxy")(config.options.target.port);

function proxyHandler(handler, configuration) {
    handler.proxy.setup("proxyone", configuration, {})
    let proxy = handler.proxy.serve("proxyone");
    return function (req, res, next) {
        proxy.proxy.web(req, res)
    }
}

let h = cgijs.proxy();
app.use("/proxyone", proxyHandler(h, config));


function response(type, exeOptions) {

    return function (req, res) {
        let cgi = cgijs.init();
        // console.log("test", req)
        let requestObject = {
            url: URL.parse(req.originalUrl),
            originalUrl: req.originalUrl,
            query: req.url.query,
            method: req.method,
            body: req.body,
            ip: req.ip,
            headers: req.headers
        }

        return cgi.serve(type, requestObject, exeOptions).then(function (result) {
            console.log("Result Fn", result)
            result.statusCode = (!result.statusCode) ? 200 : result.statusCode;
            res.status(result.statusCode).send(result.response);
        }).catch(function (error) {
            console.log("Error Fn", error)
            error.statusCode = (!error.statusCode) ? 500 : error.statusCode;
            res.status(error.statusCode).send(error.response);
        });
    };
}


// PHP File: Use bin as string
app.use("/php", response('php', { web_root_folder: php, bin: php_bin, config_path: php_config, host: shost, port: sport, cmd_options: php_cmd_options }));
// PHP File: Use bin as object definition
app.use("/phpud", response('php', { web_root_folder: php, bin: { bin_path: php_bin, useDefault: (typeof configuration.php.embed.bin === "string") ? true : configuration.php.embed.bin.useDefault }, config_path: php_config, host: shost, port: sport, cmd_options: php_cmd_options }));
// PHP File: Use bin as Object definition with useDefault false
app.use("/phpnud", response('php', { web_root_folder: php, bin: { bin_path: php_bin, useDefault: (typeof configuration.php.embed.bin === "string") ? false : configuration.php.embed.bin.useDefault }, config_path: php_config, host: shost, port: sport, cmd_options: php_cmd_options }));
// PHP File: Use bin as Object definition with useDefault true
app.use("/phpdud", response('php', { web_root_folder: php, bin: { bin_path: php_bin, useDefault: (typeof configuration.php.embed.bin === "string") ? true : configuration.php.embed.bin.useDefault }, config_path: php_config, host: shost, port: sport, cmd_options: php_cmd_options }));


// RB File
app.use("/rb", response('rb', { web_root_folder: rby, bin: rby_bin, config_path: rby_config, host: shost, port: sport, cmd_options: rby_cmd_options }));
// RB File
app.use("/rbud", response('rb', { web_root_folder: rby, bin: { bin_path: rby_bin, useDefault: (typeof configuration.rb.embed.bin === "string") ? true : configuration.rb.embed.bin.useDefault }, config_path: rby_config, host: shost, port: sport, cmd_options: rby_cmd_options }));
// RB File with useDefault as false
app.use("/rbnud", response('rb', { web_root_folder: rby, bin: { bin_path: rby_bin, useDefault: (typeof configuration.rb.embed.bin === "string") ? true : configuration.rb.embed.bin.useDefault }, config_path: rby_config, host: shost, port: sport, cmd_options: rby_cmd_options }));


// PLC File
app.use("/plc", response('plc', { web_root_folder: pl, bin: { bin_path: pl_bin, useDefault: (typeof configuration.pl.embed.bin === "string") ? true : configuration.pl.embed.bin.useDefault }, config_path: pl_config, host: shost, port: sport, cmd_options: pl_cmd_options }));
// PLD File
app.use("/pld", response('pld', { web_root_folder: pl, bin: { bin_path: pl_bin, useDefault: (typeof configuration.pl.embed.bin === "string") ? true : configuration.pl.embed.bin.useDefault }, config_path: pl_config, host: shost, port: sport, cmd_options: pl_cmd_options }));
// PL File
app.use("/pl", response('pl', { web_root_folder: pl, bin: { bin_path: pl_bin, useDefault: (typeof configuration.pl.embed.bin === "string") ? true : configuration.pl.embed.bin.useDefault }, config_path: pl_config, host: shost, port: sport, cmd_options: pl_cmd_options }));
// PLC File with useDefault as false
app.use("/plcnud", response('plc', { web_root_folder: pl, bin: { bin_path: pl_bin, useDefault: (typeof configuration.pl.embed.bin === "string") ? false : configuration.pl.embed.bin.useDefault }, config_path: pl_config, host: configuration.server.host, port: configuration.server.port, cmd_options: pl_cmd_options }));
// PLD File with useDefault as false
app.use("/pldnud", response('pld', { web_root_folder: pl, bin: { bin_path: pl_bin, useDefault: (typeof configuration.pl.embed.bin === "string") ? false : configuration.pl.embed.bin.useDefault }, config_path: pl_config, host: configuration.server.host, port: configuration.server.port, cmd_options: pl_cmd_options }));
// PL File with useDefault as false
app.use("/plnud", response('pl', { web_root_folder: pl, bin: { bin_path: pl_bin, useDefault: (typeof configuration.pl.embed.bin === "string") ? false : configuration.pl.embed.bin.useDefault }, config_path: pl_config, host: configuration.server.host, port: configuration.server.port, cmd_options: pl_cmd_options }));


// PYTHON File
app.use("/py", response('py', { web_root_folder: py, bin: { bin_path: py_bin, useDefault: (typeof configuration.py.embed.bin === "string") ? true : configuration.py.embed.bin.useDefault }, config_path: py_config, host: shost, port: sport, cmd_options: py_cmd_options }));
// PYTHON3 File
app.use("/py3", response('py3', { web_root_folder: py, bin: { bin_path: py_bin, useDefault: (typeof configuration.py.embed.bin === "string") ? true : configuration.py.embed.bin.useDefault }, config_path: py_config, host: shost, port: sport, cmd_options: py_cmd_options }));
// PYTHON File with useDefault as false
app.use("/pynud", response('py', { web_root_folder: py, bin: { bin_path: py_bin, useDefault: (typeof configuration.py.embed.bin === "string") ? false : configuration.py.embed.bin.useDefault }, config_path: py_config, host: configuration.server.host, port: configuration.server.port, cmd_options: py_cmd_options }));
// PYTHON3 File with useDefault as false
app.use("/pynud3", response('py3', { web_root_folder: py, bin: { bin_path: py_bin, useDefault: (typeof configuration.py.embed.bin === "string") ? false : configuration.py.embed.bin.useDefault }, config_path: py_config, host: configuration.server.host, port: configuration.server.port, cmd_options: py_cmd_options }));


app.use("*", function (req, res) {
    res.send(`
        "Testing my server"
    `);
});


let server = app.listen(sport, shost, function () {
    console.log(`Server listening at ${sport}!`);
});

process.on("SIGINT", function () {
    remoteProxy.server.close(function () {
        console.log("Closing remote proxy server");
        server.close(function () {
            console.log("Closing server");
            process.exit(1);
        });
    }.bind(server));
}.bind(server, remoteProxy));
