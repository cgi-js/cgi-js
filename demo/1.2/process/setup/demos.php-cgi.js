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
const cgijs = require("../../../../index.js");
// const cgijs = require("cgijs");
const cgijsProcess = cgijs.process();
const basePath = "";



var configPHPCGI = cgijs["default-configs"].process;

/** 
 *  name of command to be stored as in instance
 */
configPHPCGI.name = "php-cgi";

/** 
 * what type of process to use
 * exec, spawn, fork (fork uses .js file)
 * check demos.php-cgi.spawn.js, demos.php-cgi.fork.js, demos.php-cgi.exec.js as example
 */
configPHPCGI.cmds["generic"] = { "exe": "php-cgi", "usage": path.join(basePath, "php-cgi"), "args": [path.join(__dirname, "..\\..\\..\\..\\www\\files\\php\\index.php")] }

/** 
 * what type of process to use
 * exec, spawn, fork (fork uses .js file)
 * check demos.php-cgi.spawn.js, demos.php-cgi.fork.js, demos.php-cgi.exec.js as example
 */
 configPHPCGI.other.executetype = "exec";

 /** 
  * default command to run
  * if not provided, uses generic command to run
  */
  configPHPCGI.other.command = "generic";


cgijsProcess.setup("processes", configPHPCGI);

/** 
 * Execute the command name and the command to run
 */
cgijsProcess.process.executeAction("php-cgi", "generic", function (e, o, se) {
    console.log(o);
    if (!!e || !!se) {
        console.log(e, se);
    }
    process.exit(0);
});

