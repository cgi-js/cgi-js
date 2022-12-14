

const obj = require("../../../src/process")();
const cgijs = require("../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const eventEmitter = new events.EventEmitter();


let processes = obj.process.fetchRunning({
    stdio: 'inherit',
    shell: true
}, (error, stdout, stderr) => {
    console.log("Starting Tests for test.cgi.process.fetchRunning dataHandlers tests")
    // console.log("error, stdout, stderr ", error, stdout, stderr)
    assert(stdout.toString().includes("node.exe"), "stdout.toString().contains(\"node.exe\")")
    // Tests for windows only
    assert(stdout.toString().includes("Win32_Process"), "Windows ONLY Test (should fail in other OS): stdout.toString().includes(\"Win32_Process\") to test any Win32 process running")
    assert(stdout.toString().includes("WMIC.exe"), "Windows ONLY Test (should fail in other OS): stdout.toString().includes(\"WMIC.exe\") to test wmic running")
    // Tests for linux only
    let p = new RegExp("\\b"+ "ps" + "\\b")
    assert(p.test(stdout.toString()), "Linux / Android / Mac ONLY Test (should fail in other OS): stdout.toString() includes ps word to test ps command running")
    
    console.log("Ending Tests: with above failure test.cgi.process.fetchRunning dataHandlers tests")
})


