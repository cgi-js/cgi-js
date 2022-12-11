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

const path = require("path");
const os = require("os");
const cgijs = require("../../index.js");
const cgijsProcess = cgijs.process();
const basePath = "";

var config = cgijs["default-configs"].process;
config.name = "php-cgi";
config.other.executetype = "exec";
config.other.command = "generic";

const ostype = os.type();

if (ostype === "Windows_NT") {
    config.cmds["generic"] = { "exe": "python", "usage": path.join(basePath, "python"), "args": [path.join(__dirname, "..\\..\\www\\files\\py\\index.py")] }
} else if (ostype === "darwin") {
    config.cmds["generic"] = { "exe": "python3", "usage": path.join(basePath, "python3"), "args": [path.join(__dirname, "..\\..\\www\\files\\py\\index.py")] }
} else if (ostype === "linux") {
    config.cmds["generic"] = { "exe": "python3", "usage": path.join(basePath, "python3"), "args": [path.join(__dirname, "..\\..\\www\\files\\py\\index.py")] }
}

/**
 * The commandline executable and arguments to run
 * Usage will override the exe
 */


cgijsProcess.process.executeProcess(config, function (e, o, se) {
    console.log(o);
    if (!!e || !!se) {
        console.log(e, se);
    }
    process.exit(0);
})
