// Convert/Write tests for the following code
var obj = require("../../src/proxy")();
var proc = obj.process.start(
    {
        exe: "python.exe",
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
    "./www/py/index.py",
    (error, stdout, stderr) => {
        // console.log(error || "No Error", stdout, stderr || "No STD Error");
        console.log("Callback function");
    },
    (options, exitCode) => console.log(options, exitCode)
);
// console.log(proc.pid, proc.process, proc.conf);
setTimeout(function () {
    proc.process.kill(1); // Does not terminate the Node.js process in the shell.
    console.log("Subprocess killed", proc.pid);
    process.exit(1);
}.bind(proc), 5000);

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

