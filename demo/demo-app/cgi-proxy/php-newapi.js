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

// if (ostype === "Linux") {
//     configuration = JSON.parse(fs.readFileSync('./demo/demo-app/config-linux.json'));
// } else if (ostype === "Windows_NT") {
//     configuration = JSON.parse(fs.readFileSync('./demo/demo-app/config-win.json'));
// } else if (ostype === "Darwin") {
//     configuration = JSON.parse(fs.readFileSync('./demo/demo-app/config-mac.json'));
// }

if (ostype === "Linux") {
    configuration = JSON.parse(fs.readFileSync('../../demo-app/config-linux.json'));
} else if (ostype === "Windows_NT") {
    configuration = JSON.parse(fs.readFileSync('../../demo-app/config-win.json'));
} else if (ostype === "Darwin") {
    configuration = JSON.parse(fs.readFileSync('../../demo-app/config-mac.json'));
}

let php_bin = (typeof configuration.php.embed.bin === "string") ? configuration.php.embed.bin : configuration.php.embed.bin.bin_path;
let php_www = path.join(__dirname, "../../../", configuration.php.script.path, configuration.php.script.file);
let php_config = configuration.php.embed.config.file;
let php_cmd_options = configuration.php.script.options;

function response(type, exeOptions) {
    const cgijs = require("../../../src");
    // const cgijs = require("cgijs");
    var cgi = cgijs.file();
    
    return function (req, res, next) {
        let requestObject = {
            file: exeOptions.web_root_folder,
            url: URL.parse(req.originalUrl),
            originalUrl: req.originalUrl,
            query: req.url.query,
            method: req.method,
            body: req.body,
            ip: req.ip,
            headers: req.headers
        }
        cgi.run(type, requestObject, exeOptions).then(function (result) {
            result.statusCode = (!result.statusCode) ? 200 : result.statusCode;
            res.set(result.headers);
            res.status(result.statusCode).send(result.response);
        }.bind(res)).catch(function (e) {
            e.statusCode = (!e.statusCode) ? 500 : e.statusCode;
            res.status(e.statusCode).send(e.response);
        });
    };
}

// PHP File: Use bin as string
app.use("/php", response('php', { web_root_folder: php_www, bin: php_bin, config_path: php_config, host: configuration.server.host, port: configuration.server.port, cmd_options: php_cmd_options }));
// PHP File: Use bin as object definition
app.use("/phpud", response('php', { web_root_folder: php_www, bin: { bin_path: php_bin, useDefault: (typeof configuration.php.embed.bin === "string") ? true : configuration.php.embed.bin.useDefault }, config_path: php_config, host: configuration.server.host, port: configuration.server.port, cmd_options: php_cmd_options }));
// PHP File: Use bin as object definition with useDefault false
app.use("/phpnud", response('php', { web_root_folder: php_www, bin: { bin_path: php_bin, useDefault: (typeof configuration.php.embed.bin === "string") ? false : configuration.php.embed.bin.useDefault }, config_path: php_config, host: configuration.server.host, port: configuration.server.port, cmd_options: php_cmd_options }));
// PHP File: Use bin as Object definition with useDefault false
app.use("/phpnudd", response('php', { web_root_folder: php_www, bin: { bin_path: php_bin, useDefault: (typeof configuration.php.embed.bin === "string") ? false : configuration.php.embed.bin.useDefault }, config_path: php_config, host: configuration.server.host, port: configuration.server.port, cmd_options: php_cmd_options }));
// PHP File: Use bin as Object definition with useDefault true
app.use("/phpudd", response('php', { web_root_folder: php_www, bin: { bin_path: php_bin, useDefault: (typeof configuration.php.embed.bin === "string") ? true : configuration.php.embed.bin.useDefault }, config_path: php_config, host: configuration.server.host, port: configuration.server.port, cmd_options: php_cmd_options }));


// module.exports = app;

app.listen(3001, "localhost", function(){
    console.log("Server started");
});
