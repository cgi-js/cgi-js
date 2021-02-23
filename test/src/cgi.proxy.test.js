// Convert/Write tests for the following code
var obj = require("../../src/proxy")();
// var proc = obj.process.start(
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
//     (error, stdout, stderr) => {
//         // console.log(error || "No Error", stdout, stderr || "No STD Error");
//     },
//     (options, exitCode) => console.log(options, exitCode)
// );
// // console.log(proc.pid, proc.process, proc.conf);
// setTimeout(function () {
//     proc.process.kill(1); // Does not terminate the Node.js process in the shell.
//     console.log("Subprocess killed", proc.pid);
//     process.exit(1);
// }.bind(proc), 5000);
