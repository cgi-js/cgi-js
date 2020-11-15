'use strict';

const fs = require('fs');
const express = require('express');
const cgijs = require("../src/index");
const path = require("path");

var cgi = cgijs.init();
var app = express();
let conf = fs.readFileSync('./demo/config.json');
let configuration = JSON.parse(conf);
let cgifiles = Object.keys(configuration.cgifiles);

// TODO:
//      Write Tests
for (let i = 0; i < cgifiles.length; i++) {
    let inst = configuration.cgifiles[cgifiles[i]];
    app.use(
        inst.path,
        cgi.serve(
            inst.lang_type, {
                web_root_folder: inst.web_root_folder, 
                bin: inst.bin, 
                config_path: inst.config_path, 
                host: inst.host, 
                port: inst.port, 
                cmd_options: inst.cmd_options 
            })
        );
}

module.exports = app;
