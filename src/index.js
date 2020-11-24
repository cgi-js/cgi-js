/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/
/* eslint no-console: 0 */
let file = require("./file");
let proxy = require("./proxy");

module.exports = {
    "init": file.serve,
    "handler": proxy
};
