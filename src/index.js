/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/

/* eslint no-console: 0 */
const fileMod = require("./file");
const proxyMod = require("./proxy");
const processMod = require("./process");
const utilsMod = require('./utils');
const { proxy, process } = require('./configs');
const middlewaresMod = require("./middlewares");

module.exports = {
    // .init - Backward compatibility [Remove in next version]
    "init": fileMod.serve,
    "file": fileMod.file,
    "cgi": fileMod.cgi,
    "proxy": proxyMod,
    "process": processMod,
    "utils": utilsMod,
    "default-configs": {
        "proxy": proxy,
        "process": process
    },
    // .middlewares - [Add in next major version]
    "middlewares": middlewaresMod
};
