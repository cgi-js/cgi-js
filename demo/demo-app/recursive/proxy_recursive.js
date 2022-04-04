'use strict';

const fs = require('fs');
const os = require("os");
const express = require('express');
const path = require("path");
const cgijs = require("../../../src");
// const cgijs = require("cgijs");

module.exports = () => {
    let proxyServers = {};
        
    const ostype = os.type();
    var configurations;

    if (ostype === "Linux") {
        configurations = JSON.parse(fs.readFileSync('./demo/demo-app/config-linux.json'));
    } else if (ostype === "Windows_NT") {
        configurations = JSON.parse(fs.readFileSync('./demo/demo-app/config-win.json'));
    } else if (ostype === "Darwin") {
        configurations = JSON.parse(fs.readFileSync('./demo/demo-app/config-mac.json'));
    }

    let configs = configurations.proxies;
    let configKeys = Object.keys(configs);
    let confLen = configKeys.length;
    let app = express();
    try {
        for (let i = 0; i < confLen; i++) {
            // Sample Proxy Servers (You have the option to avoid this all together)
            let remoteProxy = require("../remote/remote-proxy")(configs[configKeys[i]].options.target.port);
            proxyServers[configKeys[i]] = {
                remote: remoteProxy
            };
            function proxyHandler(name, handler, config) {
                handler.proxy.setup(name, config, {})
                let proxy = handler.proxy.serve(configKeys[i]);
                return function (req, res) {
                    proxy.proxy.web(req, res);
                }
            }
            app.use("/" + configKeys[i], proxyHandler(configKeys[i], cgijs.proxy(), configs[configKeys[i]]));
        }
        return { servers: proxyServers, app: app, error: null }
    } catch (e) {
        console.log("Error occured in proxy recursive ", e.toString())
        return { servers: null, app: null, error: e };
    }
}
