/*
 * 
 * TESTS UTILS
 * 
 * Tests for:
 * 
 * 
 * 
 * 
*/

let utils = require("../../../src/utils")();
const { assert } = require("console");


console.log("Starting Failing Tests: is_running Tests - personal machine pids used. change to your own")
assert(utils.is_running(2568) == false) // returns falsy value
assert(utils.is_running(3567) == false) // returns falsy value
console.log("Ending Failing Tests: is_running Tests")


