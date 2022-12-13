/**
 * 
 * Package: 
 * Author: Desktop-CGI, Ganesh B
 * Email: desktopcgi@gmail.com
 * Description: Nodejs 
 * Install: 
 * Github: https://github.com/
 * npmjs Link: 
 * File: demo/proxy/demos.proxy.js
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

    };
}

// PHP File: Use bin as string
app.use("/php", response('php-cgi', {}));

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
