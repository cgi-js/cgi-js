// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

const fs = require('fs');
const express = require('express');
const path = require("path");
const cgijs = require("../../src");
// const cgijs = require("cgijs");

let configuration = JSON.parse(fs.readFileSync('./demo/config.json'));
let config = configuration.proxies["proxyone"];

var remoteproxy = express();
remoteproxy.use("/sub", function (req, res, next) { res.status(200).send("Path //sub"); });
remoteproxy.use("/", function (req, res, next) { res.status(200).send("Path //"); });
remoteproxy.listen(config.options.target.port);

var app = express();

function proxyHandler(handler, config) {
    handler.proxy.setup("proxyone", config, {})
    let proxy = handler.proxy.serve("proxyone");
    return function (req, res, next) {
        proxy.proxy.web(req, res)
    }
}

// Subsystem for proxyHandler
app.use("/proxyone", proxyHandler(cgijs.handler(), config));
app.use("*", (req, res) => res.send("Testing Server"));

module.exports = {
    app,
    remoteproxy
};
