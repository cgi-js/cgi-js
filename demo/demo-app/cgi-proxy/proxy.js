// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

const fs = require('fs');
const os = require("os");
const express = require('express');
const path = require("path");
const cgijs = require("../../../src");
// const cgijs = require("cgijs");


const ostype = os.type();
var configuration;

if (ostype === "Linux") {
    configuration = JSON.parse(fs.readFileSync('./demo/demo-app/config-linux.json'));
} else if (ostype === "Windows_NT") {
    configuration = JSON.parse(fs.readFileSync('./demo/demo-app/config-win.json'));
} else if (ostype === "Darwin") {
    configuration = JSON.parse(fs.readFileSync('./demo/demo-app/config-mac.json'));
}

let config = configuration.proxies["proxyone"];

var remoteProxy = require("../remote/remote-proxy")(config.options.target.port);

var app = express();

function proxyHandler(handler, config) {
    handler.proxy.setup("proxyone", config, {})
    let proxy = handler.proxy.serve("proxyone");
    return function (req, res) {
        proxy.proxy.web(req, res);
    }
}

// Subsystem for proxyHandler
app.use("/proxyone", proxyHandler(cgijs.proxy(), config));
app.use("*", (req, res) => res.send("Testing Server"));

module.exports = {
    app,
    remoteProxy
};
