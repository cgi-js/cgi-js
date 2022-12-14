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


console.log("Starting Passing Tests: get.csv Tests")

const csvfile = utils.csv.get("C:\\Users\\gb\\Documents\\projects\\github\\cgi-js\\test\\src\\utils\\test.csv", resulttype="array");
const file = utils.file.get("C:\\Users\\gb\\Documents\\projects\\github\\cgi-js\\test\\src\\utils\\test.csv").split("\n")

assert(csvfile.length === file.length, "csvfile.length === file.length is true");
assert(csvfile[0].join(",").split(file[0]).length == 1, "csvfile[0].join(",") == file[0] head values are same");

console.log("Ending Passing Tests: get.csv Tests")

