

const obj = require("../../../../src/process")();
const cgijs = require("../../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const { sign } = require("crypto");
const eventEmitter = new events.EventEmitter();


// https://www.mysqltutorial.org/mysql-adminsitration/start-mysql/
// https://www.tutorialspoint.com/starting-and-stopping-mysql-server
// https://www.sqlshack.com/learn-mysql-install-mysql-server-8-0-19-using-a-noinstall-zip-archive/

var closehandler = function (prc) {
    setTimeout(() => {
        // console.log("prc", prc);

        obj.process.executeAction("mysqlprocess", "stopbat", (error, stdout, stderr) => {
            console.log("mysqlprocess closehandler error, stdout, stderr", error, stdout, stderr);
        }, (anydata, signal) => {
            // console.log("closehandler anydata, signal", anydata, signal);
            process.exit();
        });

    }, 20000);
}

eventEmitter.on('closeprocess', closehandler.bind(obj));

var mysqldstarthandler = function (prc) {
    // console.log("prc", prc);
    obj.process.exec("tasklist", [], {
        stdio: 'inherit',
        shell: true
    }, (error, stdout, stderr) => {
        console.log("mysqlprocess starthandler error", error, " stdout ", stdout, " stderr ", stderr);
        console.log("mysqlprocess tasklist stdout.includes('mysqld.exe')", stdout.includes("mysqld.exe"))
        eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    });
}

eventEmitter.on('testmysql', mysqldstarthandler.bind(obj));

var setter = obj.process.set({
    name: "mysqlprocess",
    exe: "mysqld",
    cmds: {
        start: { exe: "mysqld", usage: "", args: ["-k start"] },
        stop: { exe: "mysqld", usage: "", args: ["-k stop"] },
        reload: { exe: "mysqld", usage: "", args: ["-k restart"] },
        startbat: { exe: "..\\..\\..\\..\\binaries\\binscripts\\db-mysql\\win_start.bat", usage: "", args: [] },
        stopbat: { exe: "..\\..\\..\\..\\binaries\\binscripts\\db-mysql\\win_taskkill.bat", usage: "", args: [] }
    },
    options: {
        stdio: 'inherit',
        shell: false
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

var proc = obj.process.executeAction("mysqlprocess", "startbat", (error, stdout, stderr) => {
    console.log("mysqlprocess", " error ", error, " stdout ", stdout, " stderr ", stderr);
    // eventEmitter.emit("closeprocess", { error: error, stdout: stdout, stderr: stderr });
    eventEmitter.emit("testmysql", { error: error, stdout: stdout, stderr: stderr });
}, (signal, anydata) => {
    // console.log("mysqlprocess executeAction signal, anydata ", signal, anydata);
    eventEmitter.emit("testmysql", { data: anydata });
});

setTimeout(function () {
    eventEmitter.emit("testmysql", { process: proc });
}, 10000);
