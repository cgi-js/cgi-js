// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

const fs = require('fs');
const express = require('express');
const path = require("path");
const cgijs = require("../src");
// const cgijs = require("cgijs");

let conf = fs.readFileSync('./demo/config.json');
let configuration = JSON.parse(conf);
let config = configuration.proxies["proxyone"];

var remoteproxy = express();
remoteproxy.use("/sub", function (req, res, next) { res.status(200).send("Path //sub"); });
remoteproxy.use("/", function (req, res, next) { res.status(200).send("Path //"); });
remoteproxy.listen(config.options.target.port);

var app = express();

// "proxyone": {
//     "options": {
//         "target": {
//             "protocol": "https:",
//             "host": "127.0.0.1",
//             "port": 9001,
//             "pfx": null,
//             "passphrase": ""
//         },
//         "ws": false,
//         "secure": false,
//         "xfwd": true,
//         "toProxy": true,
//         "prependPath": true,
//         "ignorePath": false,
//         "changeOrigin": false,
//         "preserveHeaderKeyCase": true,
//         "auth": ":",
//         "hostRewrite": true,
//         "protocolRewrite": null,
//         "cookieDomainRewrite": false,
//         "cookiePathRewrite": false,
//         "headers": {},
//         "proxyTimeout": 10000,
//         "timeout": 10000,
//         "selfHandleResponse": false,
//         "buffer": null,
//         "ssl": {
//             "key": null,
//             "cert": null
//         }
//     },
//     "listenPort": 8001,
//     "stream": false,
//     "modify": false,
//     "runtime": false
// }

function proxyHandler(handler, config) {
    handler.proxy.setup("proxyone", config, {})
    let proxy = handler.proxy.serve("proxyone");
    return function (req, res, next) {
        proxy.proxy.web(req, res)
    }
}

// Subsystem for proxyHandler
app.use("/sub", proxyHandler(cgijs.handler(), config));
app.use("*", (req, res) => res.send("Testing Server"));

module.exports = {
    app,
    remoteproxy
};
