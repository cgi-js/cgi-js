

const obj = require("../../../src/process")();
const cgijs = require("../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const eventEmitter = new events.EventEmitter();


let proc = obj.process.execFile("node", ["./test.cgi.process.exec.js"], {
    stdio: 'inherit',
    shell: true 
}, (error, stdout, stderr) => {
    console.log("Starting Tests for test.cgi.process.execFile dataHandlers tests")
    assert(stdout.includes("Starting Tests for test.cgi.process.exec"), 'stdout includes Starting Tests for test.cgi.process.exec')
    assert(stdout.includes("Ending Tests: with above failure test.cgi.process.exec"), 'stdout includes Ending Tests: with above failure test.cgi.process.exec')
    console.log("Ending Tests for test.cgi.process.execFile dataHandlers tests")
})

proc.on("close", (exitcode, anydata) => {
    console.log("Starting Tests for test.cgi.process.execFile close handlers tests")
    assert(anydata === null, "Options result for closing handler is null")
    assert(exitcode === 0, "Options result for closing handler is null")
    console.log("Ending Tests: with above failure test.cgi.process.execFile close handlers tests")
})
