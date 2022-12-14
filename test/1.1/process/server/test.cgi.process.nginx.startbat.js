

const obj = require("../../../../src/process")();
const cgijs = require("../../../../src");
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
        console.log("Starting process kill tests for executeAction: ", prc.pid);
        if (obj.process.kill(prc.pid, 1)) {
            try {
                assert(obj.process.kill(prc.pid, 0), "obj.process.kill(prc.pid, 0) worked")
            }
            catch (e) {
                assert(false, "obj.process.kill(prc.pid, 0) failed")
            }
            prc = null;
        }
        console.log("Ending process kill tests for executeAction: Above are the test failures");
        console.log("Closing Node Process: ", process.pid);
        process.exit();
    }.bind(prc, obj), 10000);
}

eventEmitter.on('closeprocess', myEventHandler.bind(obj));

let proc = obj.process.executeProcess({
    name: "nginxprocess",
    exe: "nginx",
    cmds: {
        start: { exe: "start nginx", usage: "", args: [] },
        stop: { exe: "nginx -s stop", usage: "", args: [] },
        reload: { exe: "nginx -s reload", usage: "", args: [] },
        quit: { exe: "nginx -s quit", usage: "", args: [] },
        startbat: { exe: "../../../../binaries/binscripts/server-nginx/win32_start.bat", usage: "", args: [] },
        stopbat: { exe: "../../../../binaries/binscripts/server-nginx/win32_taskkill.bat", usage: "", args: [] }
    },
    options: {
        stdio: 'inherit',
        shell: true
    },
    other: {
        paths: {
            "conf": "",
            "exe": ""
        },
        env: "",
        setprocess: true,
        executetype: "exec",
        command: "startbat"
    }
}, {
    stdio: 'inherit',
    shell: true
}, (error, stdout, stderr) => {
    console.log(stdout);
    console.log("Starting Tests for test.cgi.process.executeProcess.exec dataHandlers tests")
    
    console.log("Ending Tests: with above failure test.cgi.process.executeProcess.exec dataHandlers tests")
    eventEmitter.emit('closeprocess', stdout);
}, (options, proc) => {
    console.log("Starting Tests for test.cgi.process.executeProcess.exec close handlers tests")
    
    console.log("Ending Tests: with above failure test.cgi.process.executeProcess.exec close handlers tests");
});


