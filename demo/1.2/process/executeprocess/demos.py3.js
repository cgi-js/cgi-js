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
const cgijs = require("../../../../index.js");
// const cgijs = require("cgijs");
const cgijsProcess = cgijs.process();
const basePath = "";

var config = cgijs["default-configs"].process;


const ostype = os.type();

/** 
 *  name of command to be stored as in instance
 */
config.name = "python3";

/** 
 * config.cmds["nameofcommand"] = { exe: "executablefile", usage: "usageincommandline", args: "commandline/args/including/filename" }
 * usage overrides exe. if usage is not provided exe is used as command
 * can assign multiple command names like 
 * config.cmds[nameone], config.cmds[nametwo], config.cmds[namethree], etc
 * check demos.server.httpd.js as example
 */
if (ostype === "Windows_NT") {
    config.cmds["generic"] = { "exe": "python", "usage": path.join(basePath, "python"), "args": [path.join(__dirname, "..\\..\\..\\..\\www\\files\\py\\index.py")] }
} else if (ostype === "darwin") {
    config.cmds["generic"] = { "exe": "python3", "usage": path.join(basePath, "python3"), "args": [path.join(__dirname, "..\\..\\..\\..\\www\\files\\py\\index.py")] }
} else if (ostype === "linux") {
    config.cmds["generic"] = { "exe": "python3", "usage": path.join(basePath, "python3"), "args": [path.join(__dirname, "..\\..\\..\\..\\www\\files\\py\\index.py")] }
}

/** 
 * what type of process to use
 * exec, spawn, fork (fork uses .js file)
 * check demos.php-cgi.spawn.js, demos.php-cgi.fork.js, demos.php-cgi.exec.js as example
 */
config.other.executetype = "exec";

/** 
 * default command to run
 * if not provided, uses generic command to run
 */
config.other.command = "generic";

/** 
 * Execute the command name and the command to run from the config
 * executeProcess(config, callbackFunction)
 */
cgijsProcess.process.executeProcess(config, function (e, o, se) {
    console.log(o);
    if (!!e || !!se) {
        console.log(e, se);
    }
    process.exit(0);
})
