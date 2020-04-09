var cgijs = require("./src");
let handler = cgijs.handler()

let top = handler.startProcess('ls', ['./'], {}, './');
console.log("top.id", top);
let res = handler.stopProcess(top, 'SIGINT');
if (!!res) {
    // End this node process process.js
    console.log("End this node process", process.pid);
    process.exit();
}
