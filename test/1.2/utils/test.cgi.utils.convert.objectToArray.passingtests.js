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


console.log("Starting Tests: convert.objectToArray Tests")
assert(utils.convert.objectToArray({"test": "tester"}))  // Checking for if it is an object
assert(utils.convert.objectToArray({"test": "10"}))  // Checking for if it is an object
assert(utils.convert.objectToArray("TEST test")) // Checking for if it is an object
assert(Array.isArray(utils.convert.objectToArray({"test": "tester"}))) // Checking for if it is an Array
assert(Array.isArray(utils.convert.objectToArray({"test": "10"}))) // Checking for if it is an Array
assert(Array.isArray(utils.convert.objectToArray("TEST test"))) // Checking for if it is an Array
assert(!utils.convert.objectToArray(10)) // Checking for if an integer passing returns a falsy value
assert(!utils.convert.objectToArray(()=>{})) // Checking for if an function passing returns a falsy value
console.log("Ending Passing Tests: convert.objectToArray Tests")

