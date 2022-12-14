

const obj = require("../../../../src/process")();
const cgijs = require("../../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const { sign } = require("crypto");
const eventEmitter = new events.EventEmitter();


// Apache2 Start/Stop/Reload
// https://www.cyberciti.biz/faq/star-stop-restart-apache2-webserver/


// // Linux or Windows

/**
 * Linux or Windows
 * 

{
    name: "apache2process",
    exe: "apache2",
    cmds: {
        start: { exe: "apache2", usage: "start", args: [] },
        stop: { exe: "apache2", usage: "stop", args: [] },
        reload: { exe: "apache2", usage: "restart", args: [] },
        startbat: { exe: "", usage: "", args: [] },
        stopbat: { exe: "", usage: "", args: [] }
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
}

*/

/**
 * Linux or Windows
 * 

{
    name: "apache2process",
    exe: "apache2",
    cmds: {
    start: { exe: "apache2", usage: "start", args: [] },
    stop: { exe: "apache2", usage: "stop", args: [] },
    reload: { exe: "apache2", usage: "restart", args: [] },
    startbat: { exe: "", usage: "", args: [] },
    stopbat: { exe: "", usage: "", args: [] }
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
}

*/

/**
 * Linux
 * 

{
    name: "apache2process",
    exe: "apache2",
    cmds: {
        start: { exe: "/etc/init.d/apache2", usage: "start", args: [] },
        stop: { exe: "/etc/init.d/apache2", usage: "stop", args: [] },
        reload: { exe: "/etc/init.d/apache2", usage: "restart", args: [] },
        startbat: { exe: "", usage: "", args: [] },
        stopbat: { exe: "", usage: "", args: [] }
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
}

*/

var closehandler = function (prc) {
    setTimeout(() => {
        // console.log("prc", prc);

        obj.process.executeAction("apache2process", "stopbatwin32", (error, stdout, stderr) => {
            console.log("apache2process closehandler error ", error, " stdout ", stdout, " stderr ", stderr);
        }, (anydata, signal) => {
            // console.log("closehandler anydata, signal", anydata, signal);
            process.exit();
        });

    }, 25000);
}

eventEmitter.on('closeprocess', closehandler.bind(obj));

var httpdstarthandler = function (prc) {
    // console.log("prc", prc);
    obj.process.exec("tasklist", [], {
        stdio: 'inherit',
        shell: true
    }, (error, stdout, stderr) => {
        console.log("apache2process starthandler error ", error, " stdout ", stdout, " stderr ", stderr);
        console.log("apache2process tasklist stdout.includes('httpd.exe')", stdout.includes("httpd.exe"))
        eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    });
}

eventEmitter.on('testhttp', httpdstarthandler.bind(obj));

var setter = obj.process.set({
    name: "apache2process",
    exe: "httpd",
    cmds: {
        start: { exe: "httpd", usage: "", args: ["-k start"] },
        stop: { exe: "httpd", usage: "", args: ["-k stop"] },
        reload: { exe: "httpd", usage: "", args: ["-k restart"] },
        startbatwin32: { exe: "..\\..\\..\\..\\binaries\\binscripts\\server-httpd\\win32_start.bat", usage: "", args: [] },
        stopbatwin32: { exe: "..\\..\\..\\..\\binaries\\binscripts\\server-httpd\\win32_taskkill.bat", usage: "", args: [] }
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

var proc = obj.process.executeAction("apache2process", "startbatwin32", (error, stdout, stderr) => {
    console.log("apache2process executeAction error ", error, " stdout ", stdout, " stderr ",stderr);
    // eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    // eventEmitter.emit("testhttp", { error: error, stdout: stdout, stderr: stderr });
}, (signal, anydata) => {
    // console.log("apache2process executeAction signal, anydata ", signal, anydata);
    // eventEmitter.emit("testhttp", { data: anydata });
});

setTimeout(()=>{
    eventEmitter.emit("testhttp", { process: proc });
}, 10000);
