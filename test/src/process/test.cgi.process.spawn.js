

const obj = require("../../../src/process")();
const process = require("process");
const cgijs = require("../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const eventEmitter = new events.EventEmitter();


let proc = obj.process.spawn("node ./test.cgi.process.exec.js", [], {
    stdio: 'inherit',
    shell: true
}, (error, stdout, stderr) => {
    console.log("Starting Tests for test.cgi.process.spawn dataHandlers tests")
    assert(stdout.includes("test.cgi.process.exec"), 'stdout.includes("test.cgi.process.exec")')
    assert(stdout.includes("test.cgi.process.execAction"), 'stdout.includes("test.cgi.process.execAction")')
    assert(stdout.includes("test.cgi.process.execFile"), 'stdout.includes("test.cgi.process.execFile")')
    assert(stdout.includes("test.cgi.process.execProcess"), 'stdout.includes("test.cgi.process.execProcess")')
    console.log("Ending Tests: with above failure test.cgi.process.spawn dataHandlers tests")
}, (anydata, exitcode) => {
    console.log("Starting Tests for test.cgi.process.spawn close handlers tests")
    assert(anydata === null, "Options result for closing handler is null")
    assert(exitcode === 0, "Options result for closing handler is null")
    console.log("Ending Tests: with above failure test.cgi.process.spawn close handlers tests")
})


