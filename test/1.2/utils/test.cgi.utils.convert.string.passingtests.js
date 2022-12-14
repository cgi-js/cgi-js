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


console.log("Starting Passing Tests: convert.string Tests")
assert(typeof utils.convert.string({"test": "tester"}) == "string") // Check if return value is string
assert(typeof utils.convert.string({"test": "10"}) == "string") // Check if return value is string
assert(utils.convert.string({"test": "tester"}).includes("test tester")) // Check if return value includes "test tester"
assert(utils.convert.string({"test": "10"}).includes("test 10")) // Check if return value includes "test 10"
console.log("Ending Passing Tests: convert.string Tests")


