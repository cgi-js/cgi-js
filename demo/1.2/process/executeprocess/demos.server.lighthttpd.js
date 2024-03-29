/**
 * 
 * Package: 
 * Author: Desktop-CGI, Ganesh B
 * Email: desktopcgi@gmail.com
 * Description: Nodejs 
 * Install: 
 * Github: https://github.com/
 * npmjs Link: 
 * File: demos.exe.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const path = require("path");
const cgijs = require("../../../../index.js");
// const cgijs = require("cgijs");
const cgijsProcess = cgijs.process();
const basePath = "";

var config = cgijs["default-configs"].process;
config.name = "lighthttpd";


/** 
 * what type of process to use
 * exec, spawn, fork (fork uses .js file)
 * check demos.php-cgi.spawn.js, demos.php-cgi.fork.js, demos.php-cgi.exec.js as example
 */
 config.other.executetype = "spawn";

 /** 
  * default command to run
  * if not provided, uses generic command to run
  */
 config.other.command = "generic";

/** 
 * what type of process to use
 * exec, spawn, fork (fork uses .js file)
 * check demos.php-cgi.spawn.js, demos.php-cgi.fork.js, demos.php-cgi.exec.js as example
 */
 config.cmds["generic"] = { "exe": "", "usage": "", "args": [path.join(__dirname, "")] }
 config.cmds["start"] = { "exe": "", "usage": "", "args": [path.join(__dirname, "")] }
 config.cmds["stop"] = { "exe": "", "usage": "", "args": [path.join(__dirname, "")] }
 config.cmds["reload"] = { "exe": "", "usage": "", "args": [path.join(__dirname, "")] }

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
