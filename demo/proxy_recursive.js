'use strict';

module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        try {
            const fs = require('fs');
            const express = require('express');
            const path = require("path");
            const cgijs = require("../src");
            // const cgijs = require("cgijs");
            
            var cgi = cgijs.init();
            var app = express();

            let conf = fs.readFileSync('./demo/config.json');
            let configuration = JSON.parse(conf);
            let proxies = Object.keys(configuration.proxies);
            let pl = proxies.length;

            // TODO:
            //      Check functionality with running proxy
            //      Write Tests
            for (let i = 0; i < pl; i++) {
                let cfg = configuration.proxies[proxies[i]];
                function proxyHandler(cgijs, config) {
                    let h = cgijs.handler();
                    const conn = h.proxy.start({}, config);
                    return h.proxy.setup(h, config, h.proxy.serve);
                }
                app.use(cfg.path, proxyHandler(cgi, cfg));
            }
            resolve(app);
        } catch (e) {
            reject(e);
        }
    });
    return pr;
}
