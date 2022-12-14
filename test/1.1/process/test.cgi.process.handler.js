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


const obj = require("../../../src/process")();
const cgijs = require("../../../src");
const events = require('events');
const os = require("os");
const path = require("path");
const { assert } = require("console");
const { json } = require("express");
const eventEmitter = new events.EventEmitter();



var myEventHandler = function (prc) {
    setTimeout(function () {
        console.log("Closing Process PID: ", prc.pid);
        // console.log("Process Object: ", prc);
        if (obj.process.killProcess(prc.pid, 1)) {
            prc = null;
        }
        console.log("Closing Node Process: ", process.pid);
        process.exit();
    }.bind(prc, obj), 10000);
}
eventEmitter.on('closeprocess', myEventHandler.bind(obj));


if (__dirname.toString().includes("process")) {
    var args = [path.join(__dirname, "../../../www/files/node/index.js")];
} else {
    var args = [path.join(__dirname, "./www/files/node/index.js")];
}


var proc = obj.process.executeProcess({
    name: "",
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
    function (eventType, prc) {
        console.log("Exit Handler options", eventType);
        console.log("Exit Handler process", prc.pid);
        console.log(prc)
        eventEmitter.emit('closeprocess', prc);
    }
);


