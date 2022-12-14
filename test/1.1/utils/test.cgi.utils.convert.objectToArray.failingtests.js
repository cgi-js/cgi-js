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

console.log("Starting Failing Tests: convert.objectToArray Tests")
assert(!utils.convert.objectToArray({"test": "tester"}) == false) // Checking for if it is not an object is false
assert(!utils.convert.objectToArray({"test": "10"}) == false) // Checking for if it is not an object is false
assert(!utils.convert.objectToArray("TEST test")  == false) // Checking for if it is not an object is false
assert(!Array.isArray(utils.convert.objectToArray({"test": "tester"})) == false) // Checking for if it is an not Array is false
assert(!Array.isArray(utils.convert.objectToArray({"test": "10"})) == false) // Checking for if it is an not Array is false
assert(!Array.isArray(utils.convert.objectToArray("TEST test")) == false)  // Checking for if it is an not Array is false
assert(utils.convert.objectToArray(10) == false) // Checking for if it is an falsy value
assert(utils.convert.objectToArray(()=>{}) == false) // Checking for if it is an falsy value
console.log("Ending Failing Tests: convert.objectToArray Tests")

