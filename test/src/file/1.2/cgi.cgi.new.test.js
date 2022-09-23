var request = require('supertest');

var mocha = require('mocha')
var describe = mocha.describe;
var it = mocha.it;
var assert = require('chai').assert;

const process = require("process");
let cgi = require("../../../../src/file").cgi();

let exeOptions = {
    "embed": {
        "path": "C:\\Users\\ganes\\Documents\\projects\\github\\workspace-cgi\\packages\\cgi-js",
        "bin": "binaries\\lang-php\\win",
        "config": {
            "argument": "",
            "seperator": " ",
            "file": ""
        },
        "options": {
            "-q": {
                "seperator": " ",
                "value": ""
            }
        }
    },
    "script": {
        "type": "file",
        "file": "info.php",
        "path": "./www/files/php",
        "server": {
            "host": "localhost",
            "port": 4001,
            "username": "",
            "password": "",
            "ssl": {
                "crt": "",
                "pem": ""
            }
        },
        "options": "-d expose_php=off",
        "seperator": " "
    }
}

async function server() {
    try {
        let datahandler = function (error, stdout, stderr) { }
        let closehandler = function (options, proc) {
            // process.exit(0);
        }
        let exithandler = function (arguments) { }

        let type = "php-cgi";
        let requestObject = { url: { path: "/" }, originalUrl: "", query: "", method: "GET", body: "{}", ip: "192.168.1.1", headers: "" };

        let r = await cgi.serve(type, requestObject, exeOptions, datahandler, closehandler, exithandler);
        return r;
    } catch (e) {
        return e;
    }
}
