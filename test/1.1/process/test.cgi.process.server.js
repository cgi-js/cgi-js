/*
 * 
 * TESTS SERVER FUNCTIONS
 * 
*/


const obj = require("../../../src/process")();
const cgijs = require("../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const eventEmitter = new events.EventEmitter();


var myEventHandler = function (prc) {
    setTimeout(function () {

        console.log("Closing Process PID: ", prc.pid);
        // console.log("Process Object: ", prc);

        if (obj.process.killProcess(prc.pid, 1)) {
            console.log("Closed Process PID: ", prc.pid);
            
            prc = null;
        }
        console.log("Closing Node Process: ", process.pid);
    }.bind(prc, obj), 10000);
}

eventEmitter.on('closeprocess', myEventHandler.bind(obj));

var args = [path.join("../../../www/files/node/index.js")];

function testProcessSetter() {

    console.log("Starting Tests");

    var proc = obj.process.set({
        name: "nodefileexecute",
        exe: "node",
        cmds: {
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
            executetype: "exec",
            command: "generic"
        }
    });

    let prc = obj.process.executeAction("nodefileexecute", "generic", (error, stdout, stderr) => {
        console.log("Starting Tests: obj.process.executeAction dataHandler");
        assert(stdout.includes("Testing node CGI server"), 'stdout.includes("Testing node CGI server")');
        console.log("Ending Tests: obj.process.executeAction dataHandler");    
    }, (data, prc) => {
        console.log("Starting Tests: obj.process.executeAction closehandler");
        assert(!!prc.pid, 'If process pid prc.pid exists');
        console.log("Ending Tests: obj.process.executeAction closehandler");
        eventEmitter.emit("closeprocess", prc);
    })
}

testProcessSetter();

