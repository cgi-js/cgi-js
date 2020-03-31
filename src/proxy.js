// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages 
//      Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

/* eslint no-console: 0 */

// Promising- Good
// https://www.npmjs.com/package/fast-proxy

// 
// https://www.npmjs.com/package/proxy-chain

// Promising - Good
// + fastify
// https://www.npmjs.com/package/fastify-vhost

// 
// https://www.npmjs.com/package/local-web-server
// https://www.npmjs.com/package/start-proxy-server
// https://www.npmjs.com/package/bfn-proxy

var handler = require("./proxyhandler")()

function setupProxy(options) {
    const { host, url, req, res, cbase, curl, cport } = options;
    const request = require('request');
    const conn = handler.startProxy({}, { base: cbase, url: curl, port: cport });

    request(host + url, function (error, response, body) {
        // Print the error if one occurred
            // console.error('error: ', error);
        // Print the response status code if a response was received
            // console.log('statusCode: ', response && response.statusCode);
        // Print the HTML for the Google homepage
            // console.log('body: ', body);
        if (!!error) { res.send(body.body) } else { res.status(body.statusCode).send(body.body) }
    }.bind(req, res));
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} config
 * @returns
 */
function proxy(req, res, config) {

    // set up proxy for individual
    return {};
}

module.exports = {
    proxy,
    setupProxy
};
