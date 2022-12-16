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


var configPHP = cgijs["default-configs"].process;

/** 
 *  name of command to be stored as in instance
 */
configPHP.name = "php";

/** 
 * what type of process to use
 * exec, spawn, fork (fork uses .js file)
 * check demos.php-cgi.spawn.js, demos.php-cgi.fork.js, demos.php-cgi.exec.js as example
 */
configPHP.cmds["generic"] = { "exe": "php", "usage": path.join(basePath, "php"), "args": [path.join(__dirname, "..\\..\\..\\..\\www\\files\\php\\index.php")] }

/** 
 * what type of process to use
 * exec, spawn, fork (fork uses .js file)
 * check demos.php-cgi.spawn.js, demos.php-cgi.fork.js, demos.php-cgi.exec.js as example
 */
configPHP.other.executetype = "exec";
 /** 
  * default command to run
  * if not provided, uses generic command to run
  */
configPHP.other.command = "generic";

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
configPHPCGI.cmds["generic"] = { "exe": "php-cgi", "usage": path.join(basePath, "php-cgi"), "args": [path.join(__dirname, "..\\..\\..\\www\\files\\php\\index.php")] }

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

cgijsProcess.setup("processes", configPHP);

cgijsProcess.process.executeAction("php", "generic", function (e, o, se) {
    console.log(o);
    if (!!e || !!se) {
        console.log(e, se);
    }
    process.exit(0);
});

