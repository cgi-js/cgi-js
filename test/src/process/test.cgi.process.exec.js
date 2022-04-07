

const obj = require("../../../src/process")();
const cgijs = require("../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const eventEmitter = new events.EventEmitter();



if (__dirname.toString().includes("src/process")) {
    var args = [path.join(__dirname, "../../../www/node/index.js")];
} else {
    var args = [path.join(__dirname, "./www/node/index.js")];
}

let proc = obj.process.exec("ls", [], {
    stdio: 'inherit',
    shell: true
}, (error, stdout, stderr) => {
    console.log("Starting Tests for test.cgi.process.exec")
    assert(stdout.includes("test.cgi.process.exec"), 'stdout.includes("test.cgi.process.exec")')
    assert(stdout.includes("test.cgi.process.executeAction"), 'stdout.includes("test.cgi.process.executeAction")')
    assert(stdout.includes("test.cgi.process.execFile"), 'stdout.includes("test.cgi.process.execFile")')
    assert(stdout.includes("test.cgi.process.execProcess"), 'stdout.includes("test.cgi.process.execProcess")')
    console.log("Ending Tests: with above failure test.cgi.process.exec")
})

