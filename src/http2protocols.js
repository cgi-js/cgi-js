/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/

/* eslint no-console: 0 */

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

module.exports = handlers;
