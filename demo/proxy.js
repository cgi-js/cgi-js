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

var cgi = cgijs.init();
var app = express();

let conf = fs.readFileSync('./demo/config.json');
let configuration = JSON.parse(conf);

let config = configuration.proxy

function proxyHandler(cgijs, config) {
    let h = cgijs.handler();
    const conn = h.proxy.start({}, config);
    // h.setter.connection({config.cbase + config.cport.toString(): conn});
    return h.proxy.setup(h, config, h.proxy.serve);
}

// Subsystem for proxyHandler
app.use("/sub", proxyHandler(cgijs, config));

module.exports = app;
