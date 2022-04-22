

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
        console.log("Starting process kill tests for executeAction: ", prc.pid);
        if (obj.process.kill(prc.pid, 1)) {
            try {
                assert(obj.process.kill(prc.pid, 0), "obj.process.kill(prc.pid, 0) worked")
            }
            catch (e) {
                assert(false, "obj.process.kill(prc.pid, 0) failed")
            }
            console.log("Closed Process PID: ", prc.pid);
            prc = null;
        }
        console.log("Ending process kill tests for executeAction: Above are the test failures");
        console.log("Closing Node Process: ", process.pid);
        process.exit();
    }.bind(prc, obj), 10000);
}

eventEmitter.on('closeprocess', myEventHandler.bind(obj));



let proc = obj.process.executeProcess({
    name: "lscommand",
    exe: "ls",
    cmds: {
        generic: { usage: "ls", args: [] }
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
        command: "generic"
    }
}, {
    stdio: 'inherit',
    shell: true
}, (error, stdout, stderr) => {
    console.log("Starting Tests for test.cgi.process.executeProcess.exec dataHandlers tests")
    assert(stdout.process.spawnfile.includes("cmd"), 'stdout.process.spawnfile.includes("cmd")')
    assert(stdout.process.spawnargs.indexOf("/d"), 'stdout.process.spawnfile.includes("/d")')
    assert(stdout.process.spawnargs.indexOf("/s"), 'stdout.process.spawnfile.includes("/s")')
    assert(stdout.process.spawnargs.indexOf("/c"), 'stdout.process.spawnfile.includes("/c")')
    assert(stdout.process.spawnargs.indexOf('"ls "') > -1, "stdout.process.spawnargs.indexOf('ls ') > -1")
    console.log("Ending Tests: with above failure test.cgi.process.executeProcess.exec dataHandlers tests")
    eventEmitter.emit('closeprocess', stdout);
}, (options, proc) => {
    console.log("Starting Tests for test.cgi.process.executeProcess.exec close handlers tests")
    assert(options === null, "Options result for closing handler is null")
    assert(proc === 0, "Options result for closing handler is null")
    console.log("Ending Tests: with above failure test.cgi.process.executeProcess.exec close handlers tests");
});


