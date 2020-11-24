'use strict';


let options = fs.readFileSync(confPath);
let optsKeys = Object.keys(options.proxies);
let optsLen = optsKeys.length;
for (let i = 0; i < optsLen; i++) {
    servers[optsKeys[i]] = {
        config: options.proxies[optsKeys[i]],
        server: null
    }
}

module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        try {
            const fs = require('fs');
            const express = require('express');
            const path = require("path");
            const cgijs = require("../src");
            // const cgijs = require("cgijs");

            resolve(app);
        } catch (e) {
            reject(e);
        }
    });
    return pr;
}
