

// Basic usage
const obj = require("../../../src/process")();
const events = require('events');
const eventEmitter = new events.EventEmitter();

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


// Convert/Write tests for the following code

var proc = obj.process.executeProcess(
    {
        name: "pytest",
        exe: "python",
        os: "win32",
        options: {
            stdio: 'inherit',
            shell: true
        },
        cmds: { "generic": { usage: "", args: ["./www/py/index.py"] } },
        other: {
            osPaths: {
                conf: "",
                exe: ""
            },
            executetype: "",
            command: "generic",
            serverType: ""
        }
    },
    (error, stdout, stderr) => {
        console.log("CB: Callback function Invoking for dataHandler");
        console.log("CB: Stdout: ", stdout);
        console.log("CB: Stderr: ", stderr);
        console.log("CB: Error: ", error);
    },
    (options, prc) => {
        console.log("Exit Handler options for cleanup handler", options);
        console.log("Exit Handler process", prc.pid);
        eventEmitter.emit('closeprocess', prc);
    },
    (data, code) => {
        console.log("CB: Callback function Invoking for handler");

    }
);

// console.log(proc.pid, proc.process, proc.conf);
// setTimeout(function () {
//     // Does not terminate the Node.js process in the shell.
//     proc.process.kill();
//     console.log("Subprocess killed", proc.pid);
//     process.exit(1);
// }.bind(proc), 10000);

/* Structure for startAsync function for async operation */
// var procasync = obj.process.startAsync(
//     {
//         exe: "python.exe",
//         args: [],
//         options: {
//             stdio: 'inherit',
//             shell: true
//         },
//         other: {
//             osPaths: {
//                 conf: "",
//                 exe: ""
//             },
//             command: "",
//             serverType: ""
//         }
//     },
//     "./www/py/index.py",
//     {
//         func: function (error, stdout, stderr) {
//             // var prom = new Promise(function (resolve, reject) {
//             //     console.log(data);
//             //     resolve(data);
//             // }.bind(error, stdout, stderr));
//             // return prom;
//             console.log("main func", error, stdout, stderr);
//         },
//         then: function (data) {
//             console.log("main function");
//         },
//         catch: function (err) {
//             console.log("catch function");
//         },
//         finally: function (data) {
//             console.log("finally function");
//         }
//     },
//     {
//         func: function (options, exitCode) {
//             var prom = new Promise(function (resolve, reject) {
//                 console.log(data);
//                 resolve(data)
//             }.bind(options, exitCode));
//             return prom;
//         },
//         then: function (data) {
//             console.log("cleaner: main function");
//         },
//         catch: function (err) {
//             console.log("cleaner: catch function");
//         },
//         finally: function (data) {
//             console.log("cleaner: finally function");
//         }
//     }
// ).then(function (data) {
//     console.log(data);
//     // setTimeout(function () {
//     //     obj.process.stopProcess(data.pid, `SIGINT`); // Does not terminate the Node.js process in the shell.
//     //     console.log("Subprocess killed", data.pid);
//     // }.bind(procasync), 4000);
// }, function (err) {
//     console.log("My error", err);
// });
