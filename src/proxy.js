/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/

/* eslint no-console: 0 */
const httpProxy = require('http-proxy');
const utils = require("./utils")();
const setter = utils.setter, getter = utils.getter, error = utils.error, osList = utils.os, processList = utils.processes, executableOptionList = utils.executableOptions;


/**
 * 
 * handler
 * Proxy Management handler
 * 
 * 
 * @returns {Object} Proxy module functions
 *      Module Object ==> { Proxy Object }
 * 
 *                 setup [function],
 *                 config [object]: {
 *                     set [function],
 *                     get [function]
 *                 },
 *                 proxy [object]: {
 *                     setup [function],
 *                     get [function],
 *                     start [function],
 *                     stop [function],
 *                     serve [function]
 *                 }
 * 
 */
function handler() {
    let configurations = {}, instanceProxyServers = {};

    let proxyPortRanges = [[8000, 9500], [10000, 15000]];
    let validProxyHandlers = ["error", "proxyReq", "proxyRes", "open", "data", "end", "close", "upgrade"];
    // let osList = ["win32", "win64", "Windows_NT", "darwin", "unix", "linux", "fedora", "debian"];


    let configurationObject = {
        "options": {
            "target": {
                "protocol": "http:",
                "host": "127.0.0.1",
                "port": 9001,
                "pfx": null,
                "passphrase": ""
            },
            "ws": false,
            "secure": false,
            "xfwd": true,
            "toProxy": true,
            "prependPath": true,
            "ignorePath": false,
            "changeOrigin": false,
            "preserveHeaderKeyCase": true,
            "auth": ":",
            "hostRewrite": true,
            "protocolRewrite": null,
            "cookieDomainRewrite": false,
            "cookiePathRewrite": false,
            "headers": {},
            "proxyTimeout": 10000,
            "timeout": 10000,
            "selfHandleResponse": false,
            "buffer": null,
            "ssl": {
                "key": null,
                "cert": null
            }
        },
        "listenPort": 8001,
        "stream": false,
        "modify": false,
        "runtime": false
    };


    /**
     * 
     * setupHandler
     * 
     * 
     * @param {*} name 
     * 
     * @param {*} optionsObject 
     * 
     */
    function setupHandler(name, optionsObject) {
        if (!name || !optionsObject) {
            return false;
        }
        switch (name) {
            case "proxyPortRanges":
                if (Array.isArray(optionsObject)) {
                    for (let i = 0; i < optionsObject.length; i++) {
                        if (!optionsObject[i] in proxyPortRanges) {
                            proxyPortRanges.push(optionsObject[i]);
                        }
                    }
                    return true;
                }
                return false;
            case "osList":
                if (Array.isArray(optionsObject)) {
                    for (let i = 0; i < optionsObject.length; i++) {
                        if (!osList.valid(optionsObject[i])) {
                            osList.set(optionsObject[i]);
                        }
                    }
                    return true;
                }
                return false;
            default:
                return false;
        }
    }


    /**
     * REDO THIS
     * 
     * getConfig
     * 
     *
     * @param {String, Array} args
     *      args is either single configuration string key or Array of keys to be fetched
     * 
     * @returns {Object} configuration
     *      configurations: configurations object
     * 
     */
    function getConfig(args) {
        return getter(configurations, args);
    }


    /**
     * REDO THIS
     * 
     * setConfig
     * 
     *
     * @param {Object} options
     *      options is the an object of configuration with names of configuration as keys
     * 
     * @returns {Boolean} 
     * 
     */
    function setConfig(options) {
        configurations = setter(configurations, options);
        return configurations;
    }


    /**
     * 
     * startProxy
     * 
     *
     * @param {Object} config
     * 
     * @returns {Boolean, Object}
     * false / proxyInstance
     * 
     */
    function startProxy(config) {
        let proxy;
        try {
            if (!!config.stream || !!config.modify || !!config.runtime) {
                proxy = new httpProxy();
            } else {
                proxy = httpProxy.createProxyServer(config.options);
            }
            return proxy;
        } catch (e) {
            return false;
        }
    }


    /**
     * 
     * stopProxy
     * 
     *
     * @param {String, Object} proxy
     * 
     * @returns {Boolean}
     * 
     */
    function stopProxy(proxy) {
        if (!proxy) { return false; }
        if (!!proxy && (typeof proxy === "string" || typeof args === "number")) {
            proxy = instanceProxyServers[proxy].proxy;
        }
        try {
            proxy.close();
            return true;
        } catch (e) {
            return false;
        }
    }


    /**
     *
     * serveProxy
     * 
     *
     * @param {String} name
     * 
     * @returns {Object}
     * proxyInstance
     * 
     */
    function serveProxy(name) {
        let inst = getter(instanceProxyServers, name);
        let proxy = startProxy(inst.config), proxyObject = {}, setInst = null;

        inst.proxy = proxy;
        inst.proxy.listen(inst.config.listenPort);

        if (!!inst.handlers) {
            let hKeys = Object.keys(inst.handlers);
            let hKeysLen = hKeys.length;
            for (let i = 0; i < hKeysLen; i++) {
                inst.proxy.on(hKeys[i], inst.handlers[hKeys[i]]);
            }
        }

        proxyObject[name] = inst;
        setInst = setter(instanceProxyServers, proxyObject);
        if (!setInst) { return false; }
        return getter(instanceProxyServers, name);
    }


    /**
     *
     * setupProxy
     * config and handlers validated and saved to servers object
     *
     * @param {String} name
     * 
     * @param {Object} config
     * 
     * @param {Object} handlerFunctions
     * 
     * @returns {Boolean} 
     * 
     */
    function setupProxy(name, config, handlerFunctions) {
        // Validate config
        // let validConfig = utils.isEqual(configurationObject, config, false, false);
        let validPort = [], hKeys = Object.keys(handlerFunctions), proxyObject = {};
        let hKeysLen = hKeys.length;

        for (let i = 0; i < proxyPortRanges.length; i++) {
            if ((config.options.target.port >= proxyPortRanges[i][0] && config.options.target.port <= proxyPortRanges[i][1])) {
                break;
            }
        }

        if (validPort.length > 0) { return false; }

        for (let i = 0; i < hKeysLen; i++) {
            if (!(validProxyHandlers.includes(hKeys[i]))) {
                console.error("setupProxy: One of the handlers are not part of validProxyHandlers");
                return false;
            }
        }

        proxyObject[name] = { "proxy": null, "config": config, "handlers": handlerFunctions };
        return !!setter(instanceProxyServers, proxyObject);
    }


    /**
     * 
     * getProxy
     * 
     * 
     * @param  {String, Array} name 
     * name / [name]
     * 
     * @returns {Boolean, Object}
     * false / ProxyInstance { proxy, config, handlers }
     * 
     */
    function getProxy(name) {
        return getter(instanceProxyServers, name);
    }


    return {
        setup: setupHandler,
        config: {
            set: setConfig,
            get: getConfig
        },
        proxy: {
            setup: setupProxy,
            get: getProxy,
            start: startProxy,
            stop: stopProxy,
            serve: serveProxy
        }
    }
}

module.exports = handler;
