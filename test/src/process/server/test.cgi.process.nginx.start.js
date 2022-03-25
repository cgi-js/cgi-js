
var obj = require("../../../../src/process")();
var utils = require("../../../../src/utils")();
const cgijs = require("../../../../src");

var events = require('events');
const path = require("path");
const { assert } = require("console");
const { json } = require("express");

var eventEmitter = new events.EventEmitter();
const os = require("os");

let procConfig;

var myEventHandler = function (prc) {
    setTimeout(function () {

        console.log("Closing Process PID: ", prc.pid);
        // console.log("Process Object: ", prc);
        if (obj.process.kill(prc.pid, 1)) {
            prc = null;
        }
        console.log("Closing Node Process: ", process.pid);
        process.exit();

    }.bind(prc, obj), 10000);
}
eventEmitter.on('closeprocess', myEventHandler.bind(obj));


function testprocessactive(proc) {
    return utils.is_running(proc.pid);
}


function testprocessstart() {

    if (__dirname.toString().includes("process")) {
        var args = [];
    } else {
        var args = [];
    }

    procConfig = {
        name: "win32nginx",
        // --> executableOptions
        type: "executable",
        // --> osList
        os: "win32",
        // --> any executable or systemctl
        exe: "nginx",
        cmds: {
            // start: { exe: "start", usage: "", args: ["C:/Users/gb/Documents/projects/github/cgi-js/binaries/server-nginx/win/nginx", "-c", "C:/Users/gb/Documents/projects/github/cgi-js/binaries/server-nginx/win/conf/nginx.conf"] },
            start: { exe: "start.bat", usage: "", args: [] },
            stop: { exe: "stop.bat", usage: "", args: [] },
            quit: { exe: "quit.bat", usage: "", args: [] },
            restart: { exe: "reload.bat", usage: "", args: [] },
            generic: { usage: "", args: args }
        },
        options: {
            stdio: 'ignore',
            shell: false,
            windowsHide: true
        },
        other: {
            paths: {
                "conf": "",
                "exe": "C:/Users/gb/Documents/projects/github/cgi-js/binaries/server-nginx",
                "anyotherpaths": ""
            },
            env: "",
            setprocess: true,
            executetype: "exec",
            command: ""
        }
    }

    procConfig.other.command = "start";
    var proc = obj.process.executeProcess(
        procConfig,
        function (error, stdout, stderr) {
            console.log("CB: Callback function Invoking Start of process");
            console.log("CB: Stdout: ", stdout);
            console.log("CB: Stderr: ", stderr);
            console.log("CB: Error: ", error);
            
        },
        function (options, prc) {
            console.log("Exit Handler options - only printing options", options);
            console.log("Exit Handler process - only printing pid", prc.pid);
            // eventEmitter.emit('closeprocess', prc);
            let processes = require("process");
            if (processes.pid) {
                console.log('This process is your pid ' + processes.pid);
              }
            setTimeout(function() {
                console.log("Closing all processes");
                prc.kill("SIGKILL");
                // obj.process.kill(p["process"].pid, "exit");
            }.bind(prc), 20000);
        }
    );
    return proc;
};


console.log("Starting nginx process");
let p = testprocessstart();
console.log("PID Nginx", p.pid);



// function testprocessrestart() {

//     if (__dirname.toString().includes("process")) {
//         var args = [];
//     } else {
//         var args = [];
//     }

//     procConfig.other.command = "restart";
//     var proc = obj.process.executeProcess(
//         procConfig,
//         function (error, stdout, stderr) {
//             console.log("CB: Callback function Invoking for Restart of process");
//             console.log("CB: Stdout: ", stdout);
//             console.log("CB: Stderr: ", stderr);
//             console.log("CB: Error: ", error);
//         },
//         function (options, prc) {
//             console.log("Exit Handler options", options);
//             console.log("Exit Handler process", prc.pid);
//             eventEmitter.emit('closeprocess', prc);
//         }
//     );
//     return proc;
// };


// if (testprocessactive(p)) {
//     console.log("Restarting nginx process");
//     p = testprocessrestart();
// }


// function testprocessstop() {

//     if (__dirname.toString().includes("process")) {
//         var args = [];
//     } else {
//         var args = [];
//     }

//     procConfig.other.command = "quit";
//     var proc = obj.process.executeProcess(
//         procConfig,
//         function (error, stdout, stderr) {
//             console.log("CB: Callback function Invoking");
//             console.log("CB: Stdout: ", stdout);
//             console.log("CB: Stderr: ", stderr);
//             console.log("CB: Error: ", error);
//         },
//         function (options, prc) {
//             console.log("Exit Handler options", options);
//             console.log("Exit Handler process", prc.pid);
//             eventEmitter.emit('closeprocess', prc);
//         }
//     );
//     return proc;
// };


// if (testprocessactive(p)) {
//     console.log("Stop nginx process");
//     p = testprocessstop();
//     testprocessactive(p);
// }

// I am unable to get the following working right for nginx.

//     function execCommand(exe, args, cmdOptions, dataHandler) {
//         let ex = require('child_process').exec;
//         return ex([exe, ...args].join(" "), cmdOptions, function (error, stdout, stderr) {
//             dataHandler(error, stdout, stderr);
//         });
//     }

// let opts = { stdio: 'ignore', shell: false, windowsHide: true };
// let dHandle = function (error, stdout, stderr) { console.log(error, stdout, stderr); }

// let args = ["c:/nginx/", "nginx.exe"];
// let proc = execCommand("start", args, options: opts, dHandle);

// This works and starts the nginx process.

// let cdargs = ["c:/nginx/", "&&", "start", "nginx.exe"];
// let proc = execCommand("cd", cdargs, options: opts, dHandle);

// To stop the nginx process, I use the following:

// 1.

// let cdstopargs = ["c:/nginx/", "&&", "nginx.exe", "-s", "stop"];
// let proc = execCommand("cd", cdstopargs, options: opts, dHandle);

// 2.
// let c = process.kill(proc.pid, 1);

