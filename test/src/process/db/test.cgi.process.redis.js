

const obj = require("../../../../src/process")();
const cgijs = require("../../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const { sign } = require("crypto");
const eventEmitter = new events.EventEmitter();

var closehandler = function (prc) {
    setTimeout(() => {
        // console.log("prc", prc);

        obj.process.executeAction("redisprocess", "stopbat", (error, stdout, stderr) => {
            console.log("redisprocess closehandler error, stdout, stderr", error, stdout, stderr);
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
        console.log("redisprocess starthandler error, stdout, stderr", error, stdout, stderr);
        console.log("redisprocess tasklist stdout.includes('redis-server.exe')", stdout.includes("redis-server.exe"))
        eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    });
}

eventEmitter.on('testredis', httpdstarthandler.bind(obj));

var setter = obj.process.set({
    name: "redisprocess",
    exe: "redis-server",
    cmds: {
        start: { exe: "redis-server", usage: "", args: ["-k start"] },
        stop: { exe: "redis-server", usage: "", args: ["-k stop"] },
        reload: { exe: "redis-server", usage: "", args: ["-k restart"] },
        startbat: { exe: "..\\..\\..\\..\\binaries\\binscripts\\db-redis\\win_start.bat", usage: "", args: [] },
        stopbat: { exe: "..\\..\\..\\..\\binaries\\binscripts\\db-redis\\win_taskkill.bat", usage: "", args: [] }
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

var proc = obj.process.executeAction("redisprocess", "startbat", (error, stdout, stderr) => {
    console.log("redisprocess error, stdout, stderr", error, stdout, stderr);
    // eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    eventEmitter.emit("testredis", { error: error, stdout: stdout, stderr: stderr });
}, (signal, anydata) => {
    // console.log("redisprocess executeAction signal, anydata ", signal, anydata);
    eventEmitter.emit("testredis", { data: anydata });
});

setTimeout(() => {
    eventEmitter.emit("testredis", { process: proc });
}, 10000);
