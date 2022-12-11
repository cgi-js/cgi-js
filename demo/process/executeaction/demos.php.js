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
config.name = "php"
config.cmds["generic"] = { "exe": "php", "usage": path.join(basePath, "php"), "args": [path.join(__dirname, "..\\..\\..\\www\\files\\php\\index.php")] }
config.other.executetype = "exec";
config.other.command = "generic";

cgijsProcess.process.set(config);
cgijsProcess.process.executeAction("php", "generic", function (e, o, se) {
    console.log(o);
    if (!!e || !!se) {
        console.log(e, se);
    }
    process.exit(0);
});

