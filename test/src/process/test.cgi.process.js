/*
 * 
 * TESTS SERVER FUNCTIONS
 * Windows Tested
 * TODO: Test in Linux
 * 
*/


const obj = require("../../../src/process")();
const utils = require("../../../src/utils")();
const cgijs = require("../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const eventEmitter = new events.EventEmitter();


function closehandler(dataObject) {
    console.log("Closing Process PID: ", dataObject["process"].pid);
    // console.log("Process Object: ", dataObject["process"]);
    if (obj.process.killProcess(dataObject["process"].pid, 1)) {
        prc = null;
    }
    console.log("Closing Node Process ", process.pid);
    process.exit();
}

function ondatahandler(dataObject) {
    console.log("Data Received Processing started: ");
    console.log(dataObject.data.data);
    console.log("Data Received Processing wrapped ");
}

var myEventHandler = function (dataObject) {
    console.log("Processing Event: ", dataObject.event)
    if (dataObject["event"] === "closeprocess") {
        setTimeout(closehandler(dataObject, obj), 25000);
        // closehandler(dataObject);
    } else if (dataObject["event"] === "dataprocess") {
        // setTimeout(ondatahandler.bind(dataObject, obj), 10000);
        ondatahandler(dataObject);
    }
}

eventEmitter.on('closeprocess', myEventHandler.bind(obj));
eventEmitter.on('dataprocess', myEventHandler.bind(obj));


if (__dirname.toString().includes("process")) {
    var args = [path.join(__dirname, "../../../www/node/index.js")];
} else {
    var args = [path.join(__dirname, "./www/node/index.js")];
}

var proc = obj.process.fetchRunning({ stdio: 'ignore', shell: false }, function (error, stdout, stderr) {
    console.log("CB: Callback function Invoking");
    // console.log("CB: Stdout: ", stdout);
    console.log("CB: Stderr: ", stderr);
    console.log("CB: Error: ", error);
    let processArray = utils.convert.csvToObject(stdout);
    // console.log("processArray", processArray);

    console.log("Starting Tests");
    console.log("Ending Tests");
    eventEmitter.emit('dataprocess', { ["data"]: { ["data"]: processArray, ["stdout"]: stdout, ["stderr"]: stderr, ["error"]: error }, ["event"]: "dataprocess" });
}, function (eventType, prc) {
    console.log("Exit Handler options", eventType);
    console.log("Exit Handler process", prc.pid);
    eventEmitter.emit('closeprocess', { ["process"]: prc, ["event"]: "closeprocess" });
});

// console.log(proc);

