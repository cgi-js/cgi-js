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


var configPHP = cgijs["default-configs"].process
configPHP.name = "php"
configPHP.cmds["generic"] = { "exe": "php", "usage": path.join(basePath, "php"), "args": [path.join(__dirname, "..\\..\\..\\www\\files\\php\\index.php")] }
configPHP.other.executetype = "exec";
configPHP.other.command = "generic";

var configPHPCGI = cgijs["default-configs"].process;
configPHPCGI.name = "php-cgi";
configPHPCGI.cmds["generic"] = { "exe": "php-cgi", "usage": path.join(basePath, "php-cgi"), "args": [path.join(__dirname, "..\\..\\..\\www\\files\\php\\index.php")] }
configPHPCGI.other.executetype = "exec";
configPHPCGI.other.command = "generic";

cgijsProcess.setup("processes", configPHP);

cgijsProcess.process.executeAction("php", "generic", function (e, o, se) {
    console.log(o);
    if (!!e || !!se) {
        console.log(e, se);
    }
    process.exit(0);
});

