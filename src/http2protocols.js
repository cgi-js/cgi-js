/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/

/* eslint no-console: 0 */

'use strict';

function protocolInterface(config) {
    this.config = config;

    this.connect = function () {
        return new Error("protocolInterface: Connect not implemented")
    }
    this.disconnect = function () {
        return new Error("protocolInterface: Disconnect not implemented")
    }
    this.serve = function () {
        return new Error("protocolInterface: Serve not implemented")
    }
    this.send = function () {
        return new Error("protocolInterface: Send not implemented")
    }
    this.receive = function () {
        return new Error("protocolInterface: Receive not implemented")
    }
}


function http2tcp(config) {
    protocolInterface.call(this, config);
}

function http2tls(config) {
    protocolInterface.call(this, config);
}

function http2udp(config) {
    protocolInterface.call(this, config);
}

function http2socksv4(config) {
    protocolInterface.call(this, config);
}

function http2socksv4a(config) {
    protocolInterface.call(this, config);
}

function http2socksv5(config) {
    protocolInterface.call(this, config);
}

function http2socks(config) {
    protocolInterface.call(this, config);
}

function http2socket(config) {
    protocolInterface.call(this, config);
}

function http2ftp(config) {
    protocolInterface.call(this, config);
}

function http2ftps(config) {
    protocolInterface.call(this, config);
}

function http2ws(config) {
    protocolInterface.call(this, config);
}


function ws2tcp(config) {
    protocolInterface.call(this, config);
}

function ws2tls(config) {
    protocolInterface.call(this, config);
}

function ws2udp(config) {
    protocolInterface.call(this, config);
}

function ws2socksv4(config) {
    protocolInterface.call(this, config);
}

function ws2socksv4a(config) {
    protocolInterface.call(this, config);
}

function ws2socksv5(config) {
    protocolInterface.call(this, config);
}

function ws2socks(config) {
    protocolInterface.call(this, config);
}

function ws2socket(config) {
    protocolInterface.call(this, config);
}

function ws2ftp(config) {
    protocolInterface.call(this, config);
}

function ws2ftps(config) {
    protocolInterface.call(this, config);
}

function ws2ws(config) {
    protocolInterface.call(this, config);
}


function handlers(config) {
    protocolInterface.call(this, config);

    if (config.protocol === "udp") {

    } else if (config.protocol === "tcp") {

    } else if (config.protocol === "tls") {

    } else if (config.protocol === "ws") {

    } else if (config.protocol === "socks") {

    } else if (config.protocol === "SOCKSv4") {

    } else if (config.protocol === "SOCKSv4a") {

    } else if (config.protocol === "SOCKSv5") {

    } else if (config.protocol === "socket") {

    } else if (config.protocol === "ftp") {

    }

    return {
        connect: this.connect,
        disconnect: this.disconnect,
        serve: this.serve,
        send: this.send,
        receive: this.receive
    }
}



module.exports.http2tcp = http2tcp;
module.exports.http2tls = http2tls;
module.exports.http2udp = http2udp;
module.exports.http2socksv4 = http2socksv4;
module.exports.http2socksv4a = http2socksv4a;
module.exports.http2socksv5 = http2socksv5;
module.exports.http2socks = http2socks;
module.exports.http2socket = http2socket;
module.exports.http2ftp = http2ftp;
module.exports.http2ftps = http2ftps;
module.exports.http2ws = http2ws;
module.exports.ws2tcp = ws2tcp;
module.exports.ws2tls = ws2tls;
module.exports.ws2udp = ws2udp;
module.exports.ws2socksv4 = ws2socksv4;
module.exports.ws2socksv4a = ws2socksv4a;
module.exports.ws2socksv5 = ws2socksv5;
module.exports.ws2socks = ws2socks;
module.exports.ws2socket = ws2socket;
module.exports.ws2ftp = ws2ftp;
module.exports.ws2ftps = ws2ftps;
module.exports.ws2ws = ws2ws;
module.exports = handlers;
