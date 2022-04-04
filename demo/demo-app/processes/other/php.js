// Basic usage
var obj = require("../../../../src/process")();
var events = require('events');
var eventEmitter = new events.EventEmitter();
const os = require("os");
const ostype = os.type();

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

var proc;

if (ostype === "Linux") {
    proc = obj.process.start(
        {
            exe: "php",
            args: [],
            options: {
                stdio: 'inherit',
                shell: true
            },
            other: {
                osPaths: {
                    conf: "",
                    exe: ""
                },
                command: "",
                serverType: ""
            }
        },
        "./www/php/index.php",
        (error, stdout, stderr) => {
            console.log("CB: Callback function Invoking");
            console.log("CB: Stdout: ", stdout);
            console.log("CB: Stderr: ", stderr);
            console.log("CB: Error: ", error);
        },
        (options, prc) => {
            console.log("Exit Handler options", options);
            console.log("Exit Handler process", prc.pid);
            eventEmitter.emit('closeprocess', prc);
        }
    );
} else if (ostype === "Windows_NT") {
    proc = obj.process.start(
        {
            exe: "php.exe",
            args: [],
            options: {
                stdio: 'inherit',
                shell: true
            },
            other: {
                osPaths: {
                    conf: "",
                    exe: ""
                },
                command: "",
                serverType: ""
            }
        },
        "./www/php/index.php",
        (error, stdout, stderr) => {
            console.log("CB: Callback function Invoking");
            console.log("CB: Stdout: ", stdout);
            console.log("CB: Stderr: ", stderr);
            console.log("CB: Error: ", error);
        },
        (options, prc) => {
            console.log("Exit Handler options", options);
            console.log("Exit Handler process", prc.pid);
            eventEmitter.emit('closeprocess', prc);
        }
    );
} else if (ostype === "Darwin") {
    proc = obj.process.start(
        {
            exe: "php",
            args: [],
            options: {
                stdio: 'inherit',
                shell: true
            },
            other: {
                osPaths: {
                    conf: "",
                    exe: ""
                },
                command: "",
                serverType: ""
            }
        },
        "./www/php/index.php",
        (error, stdout, stderr) => {
            console.log("CB: Callback function Invoking");
            console.log("CB: Stdout: ", stdout);
            console.log("CB: Stderr: ", stderr);
            console.log("CB: Error: ", error);
        },
        (options, prc) => {
            console.log("Exit Handler options", options);
            console.log("Exit Handler process", prc.pid);
            eventEmitter.emit('closeprocess', prc);
        }
    );
}

