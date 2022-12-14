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


console.log("Starting Passing Tests: set.file Tests")

const jsonfile = utils.file.get("C:\\Users\\gb\\Documents\\projects\\github\\cgi-js\\demo\\demo-app\\config-win.json");


utils.file.set("./jsonfile.json", jsonfile);

let tmpjson = JSON.parse(utils.file.get("./jsonfile.json"));
const keys = Object.keys(tmpjson);

assert(keys.includes("php"), "keys.includes('php') contains php is true")
assert(keys.includes("py"), "keys.includes('py') contains py is true")
assert(keys.includes("pl"), "keys.includes('pl') contains pl is true")
assert(keys.includes("rb"), "keys.includes('rb') contains rb is true")
assert(keys.includes("cgifiles"), "keys.includes('cgifiles') contains cgifiles is true")
assert(keys.includes("server"), "keys.includes('rb') contains server is true")
assert(keys.includes("proxies"), "keys.includes('proxies') contains proxies is true")


console.log("Ending Passing Tests: set.file Tests. Above are the failing tests. No entries mean no failed tests")


