

const obj = require("../../../src/process")();
const cgijs = require("../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const eventEmitter = new events.EventEmitter();



if (__dirname.toString().includes("src/process")) {
    var args = [path.join(__dirname, "../../../www/node/index.js")];
} else {
    var args = [path.join(__dirname, "./www/node/index.js")];
}

