

const obj = require("../../../src/process")();
const cgijs = require("../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const eventEmitter = new events.EventEmitter();


// if (__dirname.toString().includes("src/process")) {
//     var args = [path.join(__dirname, "../../../www/files/node/index.js")];
// } else {
//     var args = [path.join(__dirname, "./www/files/node/index.js")];
// }


let proc = obj.process.exec("ls", [], {
    stdio: 'inherit',
    shell: true
}, (error, stdout, stderr) => {
    console.log("Starting Tests for test.cgi.process.exec")
    assert(stdout.includes(".todo"), 'stdout.includes(".todo")')
    assert(stdout.includes("test.cgi.process.exec"), 'stdout.includes("test.cgi.process.exec")')
    assert(stdout.includes("test.cgi.process.fork"), 'stdout.includes("test.cgi.process.fork")')
    assert(stdout.includes("test.cgi.process.execFile"), 'stdout.includes("test.cgi.process.execFile")')
    console.log("Ending Tests: with above failure test.cgi.process.exec")
});


let procs = obj.process.exec("node", ["--version"], {
    stdio: 'inherit',
    shell: true
}, (error, stdout, stderr) => {
    console.log("Starting Second Tests for test.cgi.process.exec")
    assert(stdout.toString().includes("v"), 'stdout.includes("stdout.toString().includes("v")")')
    console.log("Ending Second Tests: with above failure test.cgi.process.exec")
});
