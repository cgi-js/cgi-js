/*
 * 
 * TESTS PROCESS FUNCTIONS 
 * 
 * Tests for:
 * 
 * startprocess
 * stopprocess
 * startprocess, stopprocess
 * startprocess with correct args
 * startprocess with incorrect args
 * stopprocess with correct args
 * stopprocess with incorrect args
 * setter and getter for process functions 
 * 
 * Simple Usage of Start and Stop Process functions of proxy.js file
 * Tests pending
 *
*/


var obj = require("../../../src/process")();
const cgijs = require("../../../src");
var events = require('events');
const path = require("path");
const { assert } = require("console");
const { json } = require("express");
var eventEmitter = new events.EventEmitter();
const os = require("os");

var myEventHandler = function (prc) {
    setTimeout(function () {
        console.log("Closing Process PID: ", prc.pid);
        // console.log("Process Object: ", prc);
        if (obj.process.kill(prc.pid, 1)) {
            prc = null;
        }
        console.log("Closing Node Process: ", process.pid);
        process.exit();
    }.bind(prc, obj), 10000);
}
eventEmitter.on('closeprocess', myEventHandler.bind(obj));


if (__dirname.toString().includes("process")) {
    var args = [path.join(__dirname, "../../../www/node/index.js")];
} else {
    var args = [path.join(__dirname, "./www/node/index.js")];
}

var proc = obj.process.start({
    name: "",
    // --> executableOptions
    type: "executable",
    // --> osList
    os: "win32",
    // --> any executable or systemctl
    exe: "node",
    cmds: {
        start: { usage: "start", args: [] },
        stop: { usage: "stop", args: [] },
        restart: { usage: "restart", args: [] },
        generic: { usage: "", args: args }
    },
    options: {
        stdio: 'inherit',
        shell: true
    },
    other: {
        paths: {
            "conf": "",
            "exe": "",
            "anyotherpaths": ""
        },
        env: "",
        command: "generic"
    }
},
    function (error, stdout, stderr) {
        console.log("CB: Callback function Invoking");
        console.log("CB: Stdout: ", stdout);
        console.log("CB: Stderr: ", stderr);
        console.log("CB: Error: ", error);

        console.log("Starting Tests");



        console.log("Ending Tests");

    },
    function (options, prc) {
        console.log("Exit Handler options", options);
        console.log("Exit Handler process", prc.pid);
        eventEmitter.emit('closeprocess', prc);
    }
);

