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
const seperator = ",";
const linebreak = "\n";
let resulttype = "object";

console.log("Starting Passing Tests: convert.arrayToObject Tests");

let file = utils.file.get("C:\\Users\\gb\\Documents\\projects\\github\\cgi-js\\test\\src\\utils\\test.csv");
let csv = utils.convert.csvToObject(file, seperator, linebreak, resulttype);
let headers = file.split(linebreak)[0].split(seperator);
let keys = Object.keys(csv[0]);

assert(keys.length == headers.length, "keys.length == headers.length is true");

console.log("Ending Passing Tests: convert.arrayToObject Tests");

