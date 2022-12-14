

const obj = require("../../../src/process")();
const cgijs = require("../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const eventEmitter = new events.EventEmitter();


let processes = obj.process.find({
    stdio: 'inherit',
    shell: true
}, (error, stdout, stderr) => {
    console.log("Starting Tests for test.cgi.process.find dataHandlers tests")
    // console.log("error, stdout, stderr ", error, stdout, stderr)
    // TODO
    // Tests for Logic - Logic to be redone
    console.log("Ending Tests: with above failure test.cgi.process.find dataHandlers tests")
}, {
    "executable": "cmd.exe"
})

