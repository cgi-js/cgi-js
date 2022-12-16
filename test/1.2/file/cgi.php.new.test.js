/**
 * 
 * Package: 
 * Author: Desktop-CGI, Ganesh B
 * Email: desktopcgi@gmail.com
 * Description: Nodejs 
 * Install: 
 * Github: https://github.com/
 * npmjs Link: 
 * File: .js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


const express = require('express');
const URL = require('url');
const fs = require('fs');
const os = require('os');
const path = require("path");
const cgijs = require("../../index.js");
const { config } = require('process');
// const cgijs = require("cgijs");

var app = express();

const ostype = os.type();
var configuration, lang_config;

if (ostype === "Linux") {
    configuration = JSON.parse(fs.readFileSync('../../demo/demo-app/config-linux.json'));
} else if (ostype === "Windows_NT") {
    configuration = {
        "embed": {
            "path": "C:\\Users\\GB\\Documents\\projects\\desktopcgi\\desktop-cgi-application\\cgi-js",
            "bin": "../../../../binaries/php",
            "config": {
                "argument": "",
                "seperator": " ",
                "file": ""
            },
            // "options": {
            //     "-c": {
            //         "seperator": " ",
            //         "value": ""
            //     }
            // }
        },
        "script": {
            "type": "file",
            "file": "info.php",
            "path": "\\www\\files\\php",
            "server": {
                "host": "localhost",
                "port": 3001,
                "username": "",
                "password": "",
                "ssl": {
                    "crt": "",
                    "pem": ""
                }
            },
            "options": "-d expose_php=off",
            "seperator": " "
        }
    };
} else if (ostype === "Darwin") {
    configuration = JSON.parse(fs.readFileSync('../../demo/demo-app/config-mac.json'));
}

if (typeof configuration.embed.config === "string") {
    lang_config = configuration.embed.config
} else if (typeof configuration.embed.config === "object") {
    lang_config = configuration.embed.config["argument"] + configuration.embed.config["seperator"] + configuration.embed.config["file"];
}

let sport = 9090, shost = '127.0.0.1';


function response(type, exeOptions) {

    return function (req, res) {
        let cgi = cgijs.file();
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
            // console.log("Result Fn", result)
            result.statusCode = (!result.statusCode) ? 200 : result.statusCode;
            res.status(result.statusCode).send(result.response);
        }).catch(function (error) {
            // console.log("Error Fn", error)
            error.statusCode = (!error.statusCode) ? 500 : error.statusCode;
            res.status(error.statusCode).send(error.response);
        });
    };
}


// PHP File: Use bin as string
app.use("/php", response('php', { ...configuration, web_root_folder: path.join(configuration.embed.path, configuration.script.path), bin: "", config_path: lang_config, host: configuration.script.server.host, port: configuration.script.server.port, cmd_options: configuration.script.options }));

app.use("*", function (req, res) {
    res.send(`
        "Testing my server"
    `);
});


let server = app.listen(sport, shost, function () {
    console.log(`Server listening at ${sport}!`);
});

process.on("SIGINT", function () {
    server.close(function () {
        console.log("Closing server");
        process.exit(1);
    });
});
