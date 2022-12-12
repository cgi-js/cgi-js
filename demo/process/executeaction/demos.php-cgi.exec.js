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
const cgijs = require("../../../index.js");
const cgijsProcess = cgijs.process();
const basePath = "";

var config = cgijs["default-configs"].process;


/** 
 *  name of command to be stored as in instance
 */
config.name = "php-cgi";

/** 
 * config.cmds["nameofcommand"] = { exe: "executablefile", usage: "usageincommandline", args: "commandline/args/including/filename" }
 * usage overrides exe. if usage is not provided exe is used as command
 * can assign multiple command names like 
 * config.cmds[nameone], config.cmds[nametwo], config.cmds[namethree], etc
 */
config.cmds["generic"] = { "exe": "php-cgi", "usage": path.join(basePath, "php-cgi"), "args": [path.join(__dirname, "..\\..\\..\\www\\files\\php\\index.php")] }

/** 
 * what type of process to use
 * exec, spawn, fork (fork uses .js file)
 */
config.other.executetype = "exec";

/** 
 * default command to run
 * if not provided, uses generic command to run
 */
config.other.command = "generic";

/** 
 * set the config into the cgijs.process "instance"
 * identified by the name in the config.name above
 */
cgijsProcess.process.set(config);

/** 
 * Execute the command name and the command to run
 * executeAction(config.name, cofig.other.command, callbackFunction)
 */
cgijsProcess.process.executeAction("php-cgi", "generic", function (e, o, se) {
    console.log(o);
    if (!!e || !!se) {
        console.log(e, se);
    }
    process.exit(0);
});

