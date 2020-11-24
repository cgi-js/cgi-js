const fs = require('fs');
const express = require('express');
const URL = require('url');
const path = require("path");
const cgijs = require("../src");
// const cgijs = require("cgijs");

var cgi = cgijs.init();
var app = express();

var cgiapps = require("./cgifiles_recursive");

// app.use(cgiapps);

let conf = fs.readFileSync('./demo/config.json');
let configuration = JSON.parse(conf);

function proxyHandler(cgijs, config) {
    let h = cgijs.handler();
    const conn = h.proxy.start({}, config);
    // h.setter.connection({config.cbase + config.cport.toString(): conn});
    return h.proxy.setup(h, config, h.proxy.serve);
}

// Subsystem for proxyHandler
app.use("/sub", proxyHandler(cgijs, configuration.proxy));

app.use("*", function (req, res) {
    res.send(`"Testing my server"`);
});

app.listen(3001, '127.0.0.1', function () {
    console.log(`Server listening at 3001`);
});
