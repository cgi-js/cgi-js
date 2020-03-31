// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 

var files = require("./src/index");
var proxy = require('./src/proxy');

// GOOD
// https://www.npmjs.com/package/electron-json-storage
// https://www.npmjs.com/package/smart-fs


function proxyRouteHandler(conf) {
    let {host, cbase, curl, cport} = conf;
    return function proxyHandler(req, res) {
        let handler = proxy.handler();
        return proxy.setupProxy(handler, {
            host: host,
            url: req.url.split('/')[0],
            req: req,
            res: res,
            cbase: cbase,
            curl: curl,
            cport: cport
        });
    }
}

files.proxyHandler = proxyRouteHandler;

module.exports = files;
