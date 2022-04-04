var cgijs = require("../../../../src");
let handler = cgijs.handler()

let procId = handler.startProcess('top', [], {}, './');
console.log("top.id", procId);

setInterval(function () {
    let res = handler.stopProcess(procId, 'SIGINT');
    if (!!res) {
        // End this node process process.js
        console.log("Ending this node process", process.pid);
        process.exit();
    }
}, 5000);
