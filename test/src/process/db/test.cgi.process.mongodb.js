

const obj = require("../../../../src/process")();
const cgijs = require("../../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const { sign } = require("crypto");
const eventEmitter = new events.EventEmitter();

// https://stackoverflow.com/questions/20796714/how-do-i-start-mongo-db-from-windows
// https://stackoverflow.com/questions/20796714/how-do-i-start-mongo-db-from-windows

var closehandler = function (prc) {
    setTimeout(() => {
        // console.log("prc", prc);

        obj.process.executeAction("mongodprocess", "stopbat", (error, stdout, stderr) => {
            console.log("mongodprocess closehandler error, stdout, stderr", error, stdout, stderr);
        }, (anydata, signal) => {
            // console.log("closehandler anydata, signal", anydata, signal);
            process.exit();
        });

    }, 20000);
}

eventEmitter.on('closeprocess', closehandler.bind(obj));

var httpdstarthandler = function (prc) {
    // console.log("prc", prc);
    obj.process.exec("tasklist", [], {
        stdio: 'inherit',
        shell: true
    }, (error, stdout, stderr) => {
        console.log("mongodprocess starthandler error, stdout, stderr", error, stdout, stderr);
        console.log("mongodprocess tasklist stdout.includes('mongod.exe')", stdout.includes("mongod.exe"))
        eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    });
}

eventEmitter.on('testmongod', httpdstarthandler.bind(obj));

var setter = obj.process.set({
    name: "mongodprocess",
    exe: "mongod",
    cmds: {
        start: { exe: "mongod", usage: "", args: ["-k start"] },
        stop: { exe: "mongod", usage: "", args: ["-k stop"] },
        reload: { exe: "mongod", usage: "", args: ["-k restart"] },
        startbat: { exe: "../../../../binaries/binscripts/db-mongo/win_start.bat", usage: "", args: [] },
        stopbat: { exe: "../../../../binaries/binscripts/db-mongo/win_taskkill.bat", usage: "", args: [] }
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
        command: ""
    }
});

var proc = obj.process.executeAction("mongodprocess", "startbat", (error, stdout, stderr) => {
    console.log("mongodprocess error, stdout, stderr", error, stdout, stderr);
    // eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    eventEmitter.emit("testmongod", { error: error, stdout: stdout, stderr: stderr });
}, (signal, anydata) => {
    // console.log("mongodprocess executeAction signal, anydata ", signal, anydata);
    eventEmitter.emit("testmongod", { data: anydata });
});

setTimeout(()=>{
    eventEmitter.emit("testmongod", { process: proc });
}, 10000);
