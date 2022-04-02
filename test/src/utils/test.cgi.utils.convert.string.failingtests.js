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


console.log("Starting Failing Tests: convert.string Tests")
assert((typeof utils.convert.string({"test": "tester"}) != "string") == false) // Checking if the return value is not string is false
assert((typeof utils.convert.string({"test": "10"}) != "string") == false) // Checking if the return value is not string is false
assert(!utils.convert.string({"test": "testers"}).includes("test tester")) // Checking if the return value does not include "test tester" is false
assert(!utils.convert.string({"test": "10"}).includes("tes t 10")) // Checking if the return value does not include "tes t 10" is false
assert(!utils.convert.string({"test": "10"}).includes("te st 10")) // Checking if the return value does not include "te st 10" string is false
console.log("Ending Failing Tests: convert.string Tests")


