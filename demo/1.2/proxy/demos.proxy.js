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
const cgijs = require("../../../index.js");

const ostype = os.type();
var configuration;

if (ostype === "Linux") {
    configuration = JSON.parse(fs.readFileSync(path.join("../../", './demo/demo-app/config-linux.json')));
} else if (ostype === "Windows_NT") {
    configuration = JSON.parse(fs.readFileSync(path.join("../../", './demo/demo-app/config-win.json')));
} else if (ostype === "Darwin") {
    configuration = JSON.parse(fs.readFileSync(path.join("../../", './demo/demo-app/config-mac.json')));
}


let app = express();
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
let apptwo = express();
apptwo.use("*", function (req, res) {
    res.send(`
    Testing my server - PROXY from port ${config.options.target.port} <br><br>
    Access Main at http://localhost:${sport}/
    `);
});
apptwo.listen(config.options.target.port, config.options.target.host, function () {
    console.log(`Server listening at ${config.options.target.port}!`);
});

// Sample Proxy Server (You have the option to avoid this all together)


function proxyHandler(handler, configuration) {
    handler.proxy.setup("proxyone", configuration, {})
    let proxy = handler.proxy.serve("proxyone");
    return function (req, res, next) {
        proxy.proxy.web(req, res)
    }
}

let h = cgijs.proxy();
app.use("/proxyone", proxyHandler(h, config));

app.use("*", function (req, res) {
    res.send(`
        Testing my server - NOT PROXY <br><br>
        Access proxy at http://localhost:${sport}/proxyone
    `);
});

let server = app.listen(sport, shost, function () {
    console.log(`Server listening at ${sport}!`);
});

