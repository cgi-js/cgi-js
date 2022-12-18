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

console.log("Starting Passing Tests: set.json Tests")

const jsonfile = utils.json.get(path.join(__dirname, "..\\..\\..\\demo\\demo-app\\config-win.json"));


utils.json.set("./jsonfile.json", jsonfile);

let tmpjson = utils.json.get("./jsonfile.json");
const keys = Object.keys(tmpjson);

assert(keys.includes("php"), "keys.includes('php') contains php is true")
assert(keys.includes("py"), "keys.includes('py') contains py is true")
assert(keys.includes("pl"), "keys.includes('pl') contains pl is true")
assert(keys.includes("rb"), "keys.includes('rb') contains rb is true")
assert(keys.includes("cgifiles"), "keys.includes('cgifiles') contains cgifiles is true")
assert(keys.includes("server"), "keys.includes('rb') contains server is true")
assert(keys.includes("proxies"), "keys.includes('proxies') contains proxies is true")

console.log("Ending Passing Tests: set.json Tests. Above are the failing tests. No entries mean no failed tests")


