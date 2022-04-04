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
    console.log("Closing Process PID: ", dataObject["process"].pid, dataObject);
    
    console.log("Closing Node Process ", dataObject["process"].pid);
    // process.exit();
}

function ondatahandler(dataObject) {
    console.log("Data Received Processing started: ");
    console.log(dataObject.data.data.length);
    console.log("Data Received Processing wrapped ");
}

var myEventHandler = function (dataObject) {
    console.log("Processing Event: ", dataObject.event)
    if (dataObject["event"] === "closeprocess") {
        // setTimeout(closehandler(dataObject, obj), 25000);
        closehandler(dataObject);
    } else if (dataObject["event"] === "dataprocess") {
        // setTimeout(ondatahandler.bind(dataObject, obj), 10000);
        ondatahandler(dataObject);
    }
}

eventEmitter.on('closeprocess', myEventHandler.bind(obj));
// eventEmitter.on('dataprocess', myEventHandler.bind(obj));


if (__dirname.toString().includes("process")) {
    var args = [path.join(__dirname, "../../../www/node/index.js")];
} else {
    var args = [path.join(__dirname, "./www/node/index.js")];
}


