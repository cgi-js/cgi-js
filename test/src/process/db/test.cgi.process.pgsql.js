

const obj = require("../../../../src/process")();
const cgijs = require("../../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const { sign } = require("crypto");
const eventEmitter = new events.EventEmitter();

// https://stackoverflow.com/questions/36629963/how-can-i-start-postgresql-on-windows

var closehandler = function (prc) {
    setTimeout(() => {
        // console.log("prc", prc);

        obj.process.executeAction("pgsqlprocess", "stopbat", (error, stdout, stderr) => {
            console.log("pgsqlprocess closehandler error, stdout, stderr", error, stdout, stderr);
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
        console.log("pgsqlprocess starthandler error, stdout, stderr", error, stdout, stderr);
        console.log("pgsqlprocess tasklist stdout.includes('pg_ctl.exe')", stdout.includes("pg_ctl.exe"))
        eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    });
}

eventEmitter.on('testpgsql', httpdstarthandler.bind(obj));

var setter = obj.process.set({
    name: "pgsqlprocess",
    exe: "pg_ctl",
    cmds: {
        start: { exe: "pg_ctl", usage: "", args: ["-k start"] },
        stop: { exe: "pg_ctl", usage: "", args: ["-k stop"] },
        reload: { exe: "pg_ctl", usage: "", args: ["-k restart"] },
        startbat: { exe: "..\\..\\..\\..\\binaries\\binscripts\\db-mysql\\win_start.bat", usage: "", args: [] },
        stopbat: { exe: "..\\..\\..\\..\\binaries\\binscripts\\db-mysql\\win_taskkill.bat", usage: "", args: [] }
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

var proc = obj.process.executeAction("pgsqlprocess", "startbat", (error, stdout, stderr) => {
    console.log("pgsqlprocess error, stdout, stderr", error, stdout, stderr);
    // eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    eventEmitter.emit("testpgsql", { error: error, stdout: stdout, stderr: stderr });
}, (signal, anydata) => {
    // console.log("pgsqlprocess executeAction signal, anydata ", signal, anydata);
    eventEmitter.emit("testpgsql", { data: anydata });
});

setTimeout(()=>{
    eventEmitter.emit("testpgsql", { process: proc });
}, 10000);
