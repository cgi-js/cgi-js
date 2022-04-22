

const obj = require("../../../../src/process")();
const cgijs = require("../../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const { sign } = require("crypto");
const eventEmitter = new events.EventEmitter();

// Tomcat
// https://crunchify.com/how-to-start-stop-apache-tomcat-server-via-command-line-setup-as-windows-service/

var closehandler = function (prc) {
    setTimeout(() => {
        // console.log("prc", prc);

        obj.process.executeAction("tomcatprocess", "stopbat", (error, stdout, stderr) => {
            console.log("tomcatprocess closehandler error, stdout, stderr", error, stdout, stderr);
        }, (anydata, signal) => {
            // console.log("closehandler anydata, signal", anydata, signal);
            process.exit();
        });

    }, 20000);
}

eventEmitter.on('closeprocess', closehandler.bind(obj));

var tomcatstarthandler = function (prc) {
    // console.log("prc", prc);
    obj.process.exec("tasklist", [], {
        stdio: 'inherit',
        shell: true
    }, (error, stdout, stderr) => {
        console.log("tomcatprocess starthandler error, stdout, stderr", error, stdout, stderr);
        console.log("tomcatprocess tasklist stdout.includes('tomcat10.exe')", stdout.includes("tomcat10.exe"))
        eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    });
}

eventEmitter.on('testtomcat', tomcatstarthandler.bind(obj));

var setter = obj.process.set({
    name: "tomcatprocess",
    exe: "tomcat",
    cmds: {
        start: { exe: "tomcat", usage: "", args: ["-k start"] },
        stop: { exe: "tomcat", usage: "", args: ["-k stop"] },
        reload: { exe: "tomcat", usage: "", args: ["-k restart"] },
        startbat: { exe: "../../../../binaries/binscripts/server-tomcat/win_start.bat", usage: "", args: [] },
        stopbat: { exe: "../../../../binaries/binscripts/server-tomcat/win_taskkill.bat", usage: "", args: [] }
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

var proc = obj.process.executeAction("tomcatprocess", "startbat", (error, stdout, stderr) => {
    console.log("tomcatprocess error, stdout, stderr", error, stdout, stderr);
    // eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    eventEmitter.emit("testtomcat", { error: error, stdout: stdout, stderr: stderr });
}, (signal, anydata) => {
    // console.log("tomcatprocess executeAction signal, anydata ", signal, anydata);
    eventEmitter.emit("testtomcat", { data: anydata });
});

setTimeout(()=>{
    eventEmitter.emit("testtomcat", { process: proc });
}, 10000);
