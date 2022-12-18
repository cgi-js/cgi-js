/**
 * 
 * Package: 
 * Author: Desktop-CGI, Ganesh B
 * Email: desktopcgi@gmail.com
 * Description: Nodejs 
 * Install: 
 * Github: https://github.com/
 * npmjs Link: 
 * File: .js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

var expect = require('chai').expect;
const express = require('express');
const URL = require('url');
const fs = require('fs');
const os = require('os');
const path = require("path");
const cgijs = require("../../../index.js");
// const cgijs = require("cgijs");
const { config } = require('process');
const cors = require('cors');
const superagent = require('superagent');

var app = express();
app.use(cors({ origin: true }))

const ostype = os.type();
var configuration, lang_config;

if (ostype === "Linux") {
    configuration = JSON.parse(fs.readFileSync('../../demo/demo-app/config-linux.json'));
} else if (ostype === "Windows_NT") {
    configuration = {
        "basePath": "C:\\Users\\GB\\Documents\\projects\\desktopcgi\\desktop-cgi-application\\cgi-js",
        "embed": {
            "path": "C:\\Users\\GB\\Documents\\projects\\desktopcgi\\desktop-cgi-application\\cgi-js",
            "bin": "../../../../binaries/python",
            "config": {
                "argument": "",
                "seperator": " ",
                "file": ""
            },
            // "options": {
            //     "-c": {
            //         "seperator": " ",
            //         "value": ""
            //     }
            // }
        },
        "script": {
            "type": "file",
            "file": "index.py",
            "path": "\\www\\files\\py",
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
            "options": "",
            "seperator": " "
        }
    };
} else if (ostype === "Darwin") {
    configuration = JSON.parse(fs.readFileSync('../../demo/demo-app/config-mac.json'));
}

if (typeof configuration.embed.config === "string") {
    lang_config = configuration.embed.config
} else if (typeof configuration.embed.config === "object") {
    lang_config = configuration.embed.config["argument"] + configuration.embed.config["seperator"] + configuration.embed.config["file"];
}

let sport = 9090, shost = '127.0.0.1';


function response(type, exeOptions) {

    return function (req, res) {
        let fileExecute = cgijs.cgi();

        return fileExecute.serve(type, req, exeOptions, (e, o, se) => {
            req = req, res = res;
            if (!!o) {
                (!!exeOptions.script.transformResponse) ? res.set((!!o.headers) ? o.headers : { ...exeOptions.script.headers }) : null;
                res.status((!o.statusCode) ? 200 : o.statusCode).send((!o.response) ? o : o.response);
            } else if (!!se) {
                res.status((!e.statusCode) ? 500 : e.statusCode).send(se.toString());
            } else if (!!e) {
                res.status((!se.statusCode) ? 500 : se.statusCode).send(e.toString());
            }
        });
    };
}


// PHP File: Use bin as string
app.use("/py", response('python', { ...configuration, web_root_folder: path.join(configuration.embed.path, configuration.script.path), bin: "", config_path: lang_config, host: configuration.script.server.host, port: configuration.script.server.port, cmd_options: configuration.script.options }));

app.use("/py3", response('py3', { ...configuration, web_root_folder: path.join(configuration.embed.path, configuration.script.path), bin: "", config_path: lang_config, host: configuration.script.server.host, port: configuration.script.server.port, cmd_options: configuration.script.options }));

app.use("*", function (req, res) {
    res.send(`
        "Testing my server"
    `);
});


let server = app.listen(sport, shost, function () {
    console.log(`Server listening at ${sport}!`);

    describe('test.template.js::cgijs: Test Suite for - ', function () {

        describe('test.template.js::cgijs: [Test A] Test Suite for ', function () {

            it('[Test A]  Python server executing python file', function (done) {
                superagent.get('http://127.0.0.1:9090/py').then((r) => {
                    // console.log(r.text);
                    expect(r.text.includes("Python Version of the page")).to.equal(true);
                    done();
                }).catch(console.error);
            });

            it('[Test A] Python server not executing python file', function (done) {
                superagent.get('http://127.0.0.1:9090/').then((r) => {
                    // console.log(r.text);
                    expect(r.text.includes("Testing my server")).to.equal(true);
                    done();
                }).catch(console.error);
            });

        });
    });

});


// process.on("SIGINT", function () {
//     server.close(function () {
//         console.log("Closing server");
//         process.exit(1);
//     });
// });


