'use strict';

const fs = require('fs');
const express = require('express');
const path = require("path");
const cgijs = require("../src");
// const cgijs = require("cgijs");

module.exports = () => {
    let proxyServers = {};
    let config = JSON.parse(fs.readFileSync('./demo/config.json'));
    let configs = config.proxies;
    let configKeys = Object.keys(configs);
    let confLen = configKeys.length;
    let app = express();
    try {
        for (let i = 0; i < confLen; i++) {
            // Sample Proxy Servers (You have the option to avoid this all together)
            let remoteProxy = express();
            remoteProxy.use("/sub", function (req, res, next) { res.status(200).send("Path //sub"); });
            remoteProxy.use("/", function (req, res, next) { res.status(200).send("Path //"); });
            remoteProxy.listen(configs[configKeys[i]].options.target.port);
            proxyServers[configKeys[i]] = {
                remote: remoteProxy
            };

            function proxyHandler(name, handler, config) {
                handler.proxy.setup(name, config, {})
                let proxy = handler.proxy.serve(configKeys[i]);
                return function (req, res, next) {
                    proxy.proxy.web(req, res);
                }
            }
            app.use("/" + configKeys[i], proxyHandler(configKeys[i], cgijs.handler(), configs[configKeys[i]]));
        }
        return { servers: proxyServers, app: app }
    } catch (e) {
        return e;
    }
}
