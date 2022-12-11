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


var config = cgijs["default-configs"].process
config.name = "php-cgi"
config.cmds["generic"] = { "exe": "", "usage": path.join(__dirname, "./demos.php-cgi.exec.js"), "args": [] }
config.other.executetype = "fork";
config.other.command = "generic";

cgijsProcess.process.executeProcess(config, function (e, o, se) {
    console.log(o);
    if (!!e || !!se) {
        console.log(e, se);
    }
    process.exit(0);
})

