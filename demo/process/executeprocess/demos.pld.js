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
config.name = "php-cgi";
config.other.executetype = "spawn";
config.other.command = "generic";

/**
 * The commandline executable and arguments to run
 * Usage will override the exe
 */ 
config.cmds["generic"] = { "exe": "perl", "usage": path.join(basePath, "perl"), "args": [path.join(__dirname, "..\\..\\..\\www\\files\\perl\\index.pld")] }

cgijsProcess.process.executeProcess(config, function (e, o, se) {
    console.log(o);
    if (!!e || !!se) {
        console.log(e, se);
    }
    process.exit(0);
})
