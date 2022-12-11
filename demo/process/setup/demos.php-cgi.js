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



var configPHPCGI = cgijs["default-configs"].process;
configPHPCGI.name = "php-cgi";
configPHPCGI.cmds["generic"] = { "exe": "php-cgi", "usage": path.join(basePath, "php-cgi"), "args": [path.join(__dirname, "..\\..\\..\\www\\files\\php\\index.php")] }
configPHPCGI.other.executetype = "exec";
configPHPCGI.other.command = "generic";


cgijsProcess.setup("processes", configPHPCGI);

cgijsProcess.process.executeAction("php-cgi", "generic", function (e, o, se) {
    console.log(o);
    if (!!e || !!se) {
        console.log(e, se);
    }
    process.exit(0);
});

