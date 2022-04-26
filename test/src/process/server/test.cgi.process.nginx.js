

const obj = require("../../../../src/process")();
const cgijs = require("../../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const { sign } = require("crypto");
const eventEmitter = new events.EventEmitter();



var nginxstarthandler = function (prc) {
    // console.log("prc", prc);
    obj.process.exec("tasklist", [], {
        stdio: 'inherit',
        shell: true
    }, (error, stdout, stderr) => {
        console.log("nginxstarthandler error, stdout, stderr", error, stdout, stderr);
        console.log("stdout.includes('nginx.exe')", stdout.includes("nginx.exe"))
        eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    });
}

eventEmitter.on('testhttp', nginxstarthandler.bind(obj));

var closehandler = function (prc) {
    setTimeout(() => {
        // console.log("prc", prc);

        obj.process.executeAction("nginxprocess", "stopbat", (error, stdout, stderr) => {
            console.log("closehandler error, stdout, stderr", error, stdout, stderr);
        }, (anydata, signal) => {
            // console.log("closehandler anydata, signal", anydata, signal);
            process.exit();
        });

    }, 25000);
}

eventEmitter.on('closeprocess', closehandler.bind(obj));

var setter = obj.process.set({
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
        command: ""
    }
});

var proc = obj.process.executeAction("nginxprocess", "startbat", (error, stdout, stderr) => {
    console.log("nginxprocess error, stdout, stderr", error, stdout, stderr);
    // eventEmitter.emit("testhttp", { error: error, stdout: stdout, stderr: stderr });
}, (signal, anydata) => {
    // console.log("executeAction signal, anydata ", signal, anydata);
    // eventEmitter.emit("testhttp", { data: anydata });
});


setTimeout(()=>{
    eventEmitter.emit("testhttp", { process: proc });
}, 10000)

