

const obj = require("../../../../src/process")();
const cgijs = require("../../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const { sign } = require("crypto");
const eventEmitter = new events.EventEmitter();



var phpstarthandler = function (prc) {
    // console.log("prc", prc);
    obj.process.exec("tasklist", [], {
        stdio: 'inherit',
        shell: true
    }, (error, stdout, stderr) => {
        console.log("phpstarthandler error, stdout, stderr", error, stdout, stderr);
        console.log("stdout.includes('php.exe')", stdout.includes("php.exe"))
        eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    });
}

eventEmitter.on('testphpdevserver', phpstarthandler.bind(obj));

var closehandler = function (prc) {
    setTimeout(() => {
        console.log("prc", prc);
        process.exit(1)

    }, 25000);
}

eventEmitter.on('closeprocess', closehandler.bind(obj));

var setter = obj.process.set({
    name: "phpprocess",
    exe: "php",
    cmds: {
        start: { exe: "php", usage: "", args: ["-S", "127.0.0.1:8100"] },
        stop: { exe: "", usage: "", args: [] },
        reload: { exe: "", usage: "", args: [] },
        quit: { exe: "", usage: "", args: [] }
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
        command: "start"
    }
});

var proc = obj.process.executeAction("phpprocess", "startbat", (error, stdout, stderr) => {
    console.log("phpprocess error, stdout, stderr", error, stdout, stderr);
    // eventEmitter.emit("testhttp", { error: error, stdout: stdout, stderr: stderr });
}, (signal, anydata) => {
    // console.log("executeAction signal, anydata ", signal, anydata);
    // eventEmitter.emit("testhttp", { data: anydata });
});


setTimeout(()=>{
    eventEmitter.emit("testphpdevserver", { process: proc });
}, 10000)

