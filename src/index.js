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


module.exports = {
    "init": fileMod.serve, // Backward compatibility [Remove in next version]
    "file": fileMod,
    "proxy": proxyMod,
    "process": processMod,
    "utils": utilsMod
};
