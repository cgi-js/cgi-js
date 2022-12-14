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

let equalityObjectOne = {
    "test": 10,
    "tester": "ten",
    "testers": [1, 0]
}

let equalityObjectTwo = {
    "test": 10,
    "tester": "ten",
    "testers": [1, 0]
}

let equalityObjectThree = {
    "test": 10,
    "tester": "ten"
}

console.log("Starting Passing Tests: isEqual Tests")
assert(utils.isEqual(equalityObjectOne, equalityObjectTwo)) // Equal objects is true
assert(utils.isEqual(equalityObjectTwo, equalityObjectOne)) // Equal objects is true
console.log("Ending Passing Tests: isEqual Tests")

