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

console.log("Starting Tests: Failing Tests")
assert(utils.isEqual(equalityObjectTwo, equalityObjectThree) == false) // Equal objects is not true
assert(utils.isEqual(equalityObjectThree, equalityObjectTwo) == false) // Equal objects is not true
assert(utils.isEqual(equalityObjectOne, equalityObjectTwo) == false) // Equal objects is not true
console.log("Ending Tests: Failing Tests")

