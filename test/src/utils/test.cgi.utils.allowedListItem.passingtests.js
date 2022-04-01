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

console.log("Passing Tests: Passing Tests")
assert(utils.allowedItem(["ab", "bc", "cd", "de", "ef"], "bc"))
assert(utils.allowedItem(["ab", "bc", "cd", "de", "ef"], "ab"))
assert(!utils.allowedItem(["ab", "bc", "cd", "de", "ef"], "fg"))
assert(utils.allowedItem(["ab", "bc", "cd", "de", "ef"], "de"))
console.log("Passing Tests: Passing Tests")

