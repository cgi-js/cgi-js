// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 

var files = require("./src/index");
var proxy = require('./src/proxy');

// GOOD
// https://www.npmjs.com/package/electron-json-storage
// https://www.npmjs.com/package/smart-fs


files.handler = proxy.handler;
files.proxyHandler = proxy.proxy;

module.exports = files;
