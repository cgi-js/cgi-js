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



// Running spawn for testing

console.log("Starting Process for cmd")

let sp = obj.process.spawn("cmd.exe", [], {
    stdio: 'inherit',
    shell: true
}, (error, stdout, stderr) => {}, (data, code) =>{})

console.log("Started Process for cmd: ", sp.pid);



// Running tests for kill that will pass

console.log("Starting Kill for cmd pid ", sp.pid);
let k = obj.process.kill(sp.pid, 1);
console.log("Ending Kill for cmd pid ", sp.pid);

console.log("Starting Tests: ", "k.pid, k, k.spawnargs: ", k.pid, !!k, k.spawnargs);
assert(!!k.pid, "Testing pid for process does not exists");
assert(k.pid !== sp.pid, "Testing pid for node kill process not equal to spawn pid");
console.log("Ending Tests");



// Running tests for killProcess that will fail

console.log("Starting KillProcess for cmd pid ", sp.pid);
let kProcess = obj.process.killProcess("8624", 1);
console.log("Ending KillProcess for cmd pid ", sp.pid);

console.log("Starting Tests", "kProcess.pid, kProcess: ", kProcess.pid, kProcess.spawnargs);
assert(typeof kProcess.pid === 'undefined', "Testing pid for process is undefined");
assert(kProcess === false, "Testing process return is boolean false");
assert(typeof kProcess === 'boolean', "Testing process return is boolean false");
console.log("Ending Tests");
