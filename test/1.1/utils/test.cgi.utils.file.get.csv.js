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
const path = require("path");


console.log("Starting Passing Tests: get.csv Tests")

const csvfile = utils.csv.get(path.join(__dirname, "test.csv"), resulttype="array");
const file = utils.file.get(path.join(__dirname, "test.csv")).split("\n")

assert(csvfile.length === file.length, "csvfile.length === file.length is true");
assert(csvfile[0].join(",").split(file[0]).length == 1, "csvfile[0].join(",") == file[0] head values are same");

console.log("Ending Passing Tests: get.csv Tests")

