// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 

var files = require("./src/index");
var proxy = require('./src/proxy');

// GOOD
// https://www.npmjs.com/package/electron-json-storage
// https://www.npmjs.com/package/smart-fs

function proxyHandler(req, res) {
    let handler = proxy.handler();
    return proxy.setupProxy(handler, {
        host: 'http://127.0.0.1:8000/',
        url: req.url.split('/')[0],
        req: req,
        res: res,
        cbase: 'http://127.0.0.1:5000',
        curl: '/*',
        cport: 8000
    });
}

files.proxyHandler = proxyHandler;

module.exports = files;
