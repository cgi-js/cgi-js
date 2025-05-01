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



function tcp(config) {
    protocolInterface.call(this, config);
    
    this.connect = function () {
        
    }
    this.disconnect = function () {
        
    }
    this.serve = function () {
        
    }
    this.send = function () {
        
    }
    this.receive = function () {
        
    }
}

function tls(config) {
    protocolInterface.call(this, config);
    
    this.connect = function () {
        
    }
    this.disconnect = function () {
        
    }
    this.serve = function () {
        
    }
    this.send = function () {
        
    }
    this.receive = function () {
        
    }
}

function udp(config) {
    protocolInterface.call(this, config);
    
    this.connect = function () {
        
    }
    this.disconnect = function () {
        
    }
    this.serve = function () {
        
    }
    this.send = function () {
        
    }
    this.receive = function () {
        
    }
}

function socksv4(config) {
    protocolInterface.call(this, config);
    
    this.connect = function () {
        
    }
    this.disconnect = function () {
        
    }
    this.serve = function () {
        
    }
    this.send = function () {
        
    }
    this.receive = function () {
        
    }
}

function socksv4a(config) {
    protocolInterface.call(this, config);
    
    this.connect = function () {
        
    }
    this.disconnect = function () {
        
    }
    this.serve = function () {
        
    }
    this.send = function () {
        
    }
    this.receive = function () {
        
    }
}

function socksv5(config) {
    protocolInterface.call(this, config);
    
    this.connect = function () {
        
    }
    this.disconnect = function () {
        
    }
    this.serve = function () {
        
    }
    this.send = function () {
        
    }
    this.receive = function () {
        
    }
}

function socks(config) {
    protocolInterface.call(this, config);
    
    this.connect = function () {
        
    }
    this.disconnect = function () {
        
    }
    this.serve = function () {
        
    }
    this.send = function () {
        
    }
    this.receive = function () {
        
    }
}

function socket(config) {
    protocolInterface.call(this, config);
    
    this.connect = function () {
        
    }
    this.disconnect = function () {
        
    }
    this.serve = function () {
        
    }
    this.send = function () {
        
    }
    this.receive = function () {
        
    }
}

function ftp(config) {
    protocolInterface.call(this, config);
    
    this.connect = function () {
        
    }
    this.disconnect = function () {
        
    }
    this.serve = function () {
        
    }
    this.send = function () {
        
    }
    this.receive = function () {
        
    }
}

function ftps(config) {
    protocolInterface.call(this, config);
    
    this.connect = function () {
        
    }
    this.disconnect = function () {
        
    }
    this.serve = function () {
        
    }
    this.send = function () {
        
    }
    this.receive = function () {
        
    }
}

function ws(config) {
    protocolInterface.call(this, config);
    
    this.connect = function () {
        
    }
    this.disconnect = function () {
        
    }
    this.serve = function () {
        
    }
    this.send = function () {
        
    }
    this.receive = function () {
        
    }
}


function handlers(config) {
    protocolInterface.call(this, config);

    let o;

    if (config.protocol === "udp") {
        o = new udp(config);
        this.connect = o.connect;
        this.disconnect = o.disconnect; 
        this.serve = o.serve;
        this.send = o.send; 
        this.receive = o.receive;
    } else if (config.protocol === "tcp") {
        o = new tcp(config);
        this.connect = o.connect;
        this.disconnect = o.disconnect; 
        this.serve = o.serve;
        this.send = o.send; 
        this.receive = o.receive;
    } else if (config.protocol === "tls") {
        o = new tls(config);
        this.connect = o.connect;
        this.disconnect = o.disconnect; 
        this.serve = o.serve;
        this.send = o.send; 
        this.receive = o.receive;
    } else if (config.protocol === "ws") {
        o = new ws(config);
        this.connect = o.connect;
        this.disconnect = o.disconnect; 
        this.serve = o.serve;
        this.send = o.send; 
        this.receive = o.receive;
    } else if (config.protocol === "socks") {
        o = new socks(config);
        this.connect = o.connect;
        this.disconnect = o.disconnect; 
        this.serve = o.serve;
        this.send = o.send; 
        this.receive = o.receive;
    } else if (config.protocol === "SOCKSv4") {
        o = new sockv4(config);
        this.connect = o.connect;
        this.disconnect = o.disconnect; 
        this.serve = o.serve;
        this.send = o.send; 
        this.receive = o.receive;
    } else if (config.protocol === "SOCKSv4a") {
        o = new sockv4a(config);
        this.connect = o.connect;
        this.disconnect = o.disconnect; 
        this.serve = o.serve;
        this.send = o.send; 
        this.receive = o.receive;
    } else if (config.protocol === "SOCKSv5") {
        o = new sockv5(config);
        this.connect = o.connect;
        this.disconnect = o.disconnect; 
        this.serve = o.serve;
        this.send = o.send; 
        this.receive = o.receive;
    } else if (config.protocol === "socket") {
        o = new socket(config);
        this.connect = o.connect;
        this.disconnect = o.disconnect; 
        this.serve = o.serve;
        this.send = o.send; 
        this.receive = o.receive;
    } else if (config.protocol === "ftp") {
        o = new ftp(config);
        this.connect = o.connect;
        this.disconnect = o.disconnect; 
        this.serve = o.serve;
        this.send = o.send; 
        this.receive = o.receive;
    } else if (config.protocol === "ftps") {
        o = new ftps(config);
        this.connect = o.connect;
        this.disconnect = o.disconnect; 
        this.serve = o.serve;
        this.send = o.send; 
        this.receive = o.receive;
    }

    return {
        connect: this.connect,
        disconnect: this.disconnect,
        serve: this.serve,
        send: this.send,
        receive: this.receive
    }
}

module.exports.tcp = tcp;
module.exports.tls = tls;
module.exports.udp = udp;
module.exports.socksv4 = socksv4;
module.exports.socksv4a = socksv4a;
module.exports.socksv5 = socksv5;
module.exports.socks = socks;
module.exports.socket = socket;
module.exports.ftp = ftp;
module.exports.ftps = ftps;
module.exports.ws = ws;
module.exports.handlers = handlers;

