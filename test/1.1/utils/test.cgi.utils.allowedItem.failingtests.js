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

console.log("Starting Failing Tests: allowedItems Tests")
assert(!utils.allowedItem(["ab", "bc", "cd", "de", "ef"], "bc") == false)
assert(!utils.allowedItem(["ab", "bc", "cd", "de", "ef"], "ab") == false)
assert(utils.allowedItem(["ab", "bc", "cd", "de", "ef"], "fg") == false)
assert(!utils.allowedItem(["ab", "bc", "cd", "de", "ef"], "de") == false)
console.log("Ending Failing Tests: allowedItems Tests")

