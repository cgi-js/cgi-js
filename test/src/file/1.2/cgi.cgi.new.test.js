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
            "port": 3001,
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

function server() {
    let datahandler = function (error, stdout, stderr) { }
    let closehandler = function (options, proc) {
        // process.exit(0);
    }
    let exithandler = function (arguments) { }

    let type = "php-cgi";
    let requestObject = { url: { path: "/" }, originalUrl: "", query: "", method: "GET", body: "{}", ip: "192.168.1.1", headers: "" };

    return cgi.serve(type, requestObject, exeOptions, datahandler, closehandler, exithandler).then(function (r) {
        // console.log(r)
        return r;
    }).catch(function (e) {
        // console.log(e);
        return e.toString();
    });
}

server();
