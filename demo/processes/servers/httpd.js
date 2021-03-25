/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
	 CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 

Example for HTTPD process start stop
*/
 
// Basic usage
var obj = require("../../../src/process")();
var events = require('events');
var eventEmitter = new events.EventEmitter();
var killEventHandler = function (prc) {
    setTimeout(function() {
        console.log("Closing using kill function for Process PID: ", prc.pid);
        // console.log("Process Object: ", prc);
        if (obj.process.kill(prc.pid, 1)) {
            prc = null;
        }
        console.log("Closing Node Process: ", process.pid);
        process.exit();
    }.bind(prc, obj), 10000);
}

var closeEventHandler = function (prc) {
    setTimeout(function() {
        console.log("Closing using stop function for Process PID: ", prc.pid);
        // console.log("Process Object: ", prc);
        if (obj.process.stop(prc.pid, 1)) {
            prc = null;
        }
        console.log("Closing Node Process: ", process.pid);
        process.exit();
    }.bind(prc, obj), 10000);
}

eventEmitter.on('killprocess', killEventHandler.bind(obj));
eventEmitter.on('closeprocess', closeEventHandler.bind(obj));


// Convert/Write tests for the following code
let lconfig = {
    exe: "",
    args: [],
    options: {
        stdio: 'inherit',
        shell: true
    },
    other: {
        osPaths: {
            conf: "",
            exe: ""
        },
        command: "",
        serverType: ""
    }
}

let mconfig = {
    exe: "",
    args: [],
    options: {
        stdio: 'inherit',
        shell: true
    },
    other: {
        osPaths: {
            conf: "",
            exe: ""
        },
        command: "",
        serverType: ""
    }
}

let wconfig = {
    exe: "../binaries/server-httpd/win/httpd.exe",
    args: [],
    options: {
        stdio: 'inherit',
        shell: true
    },
    other: {
        osPaths: {
            conf: "../binaries/server-httpd/win/httpd.conf",
            exe: "../binaries/server-httpd/win/httpd.exe"
        },
        command: "",
        serverType: ""
    }
}

let configuration;
let os = require("os");
const ostype = os.type();

if (ostype === "Linux") {
    configuration = lconfig;
} else if (ostype === "Windows_NT") {
    configuration = wconfig;
} else if (ostype === "Darwin") {
    configuration = mconfig;
}

var killproc = obj.process.start(
    configuration, "",
    (error, stdout, stderr) => {
        console.log("CB: Callback function Invoking");
        console.log("CB: Stdout: ", stdout);
        console.log("CB: Stderr: ", stderr);
        console.log("CB: Error: ", error);
    },
    (options, prc) => {
        console.log("Exit Handler options", options);
        console.log("Exit Handler process", prc.pid);
        eventEmitter.emit('killprocess', prc);
    }
);

var closeproc = obj.process.start(
    configuration, "",
    (error, stdout, stderr) => {
        console.log("CB: Callback function Invoking");
        console.log("CB: Stdout: ", stdout);
        console.log("CB: Stderr: ", stderr);
        console.log("CB: Error: ", error);
    },
    (options, prc) => {
        console.log("Exit Handler options", options);
        console.log("Exit Handler process", prc.pid);
        eventEmitter.emit('closeprocess', prc);
    }
);

var stopproc = obj.process.start(
    configuration, "",
    (error, stdout, stderr) => {
        console.log("CB: Callback function Invoking");
        console.log("CB: Stdout: ", stdout);
        console.log("CB: Stderr: ", stderr);
        console.log("CB: Error: ", error);
    },
    (options, prc) => {
        console.log("Exit Handler options", options);
        console.log("Exit Handler process", prc.pid);
        // eventEmitter.emit('closeprocess', prc);
    }
);
