/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/

/* eslint no-console: 0 */
const https = require('https');
const fs = require('fs');
const httpProxy = require('http-proxy');
const utils = require("./utils")();
const setter = utils.setter;
const getter = utils.getter;

/**
 * 
 * handler
 * 
 * @returns
 */
function handler() {
    let configurations = {}, instanceProxyServers = {};
    let proxyPortRanges = [[8000, 9500], [10000, 15000]];
    let validProxyHandlers = ["error", "proxyReq", "proxyRes", "open", "data", "end", "close", "upgrade"];
    let osList = ["win32", "win64", "darwin", "unix", "linux", "fedora", "debian"];

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
                        if (optionsObject[i] in proxyPortRanges) {
                            proxyPortRanges.push(optionsObject[i]);
                        }
                    }
                    return true;
                }
                return false;
            case "osList":
                if (Array.isArray(optionsObject)) {
                    for (let i = 0; i < optionsObject.length; i++) {
                        if (optionsObject[i] in osList) {
                            osList.push(optionsObject[i]);
                        }
                    }
                    return true;
                }
                return false;
            default:
                return false;
        }
    }

    function setOS(obj) { }

    function getOS(name) { }


    // /**
    //  * 
    //  * setter
    //  * 
    //  *
    //  * @param {Object} setterObject
    //  * 
    //  * @param {Object} values
    //  * 
    //  * @returns
    //  * 
    //  */
    // function setter(setterObject, values) {
    //     if (!values && typeof values !== "object") { return false; }
    //     keys = Object.keys(values);
    //     if (!keys.length) { return false; }
    //     for (let i = 0; i < keys.length; i++) {
    //         setterObject[keys[i]] = values[keys[i]];
    //     }
    //     return true;
    // }

    // /**
    //  * 
    //  * getter
    //  * 
    //  *
    //  * @param {Object} getterObject
    //  * 
    //  * @param {String, Array} args
    //  * 
    //  * @returns {Boolean}
    //  * 
    //  */
    // function getter(getterObject, args) {
    //     if (!args) { return false; }
    //     if (typeof args === "string" || typeof args === "number") {
    //         return (!!getterObject[args]) ? getterObject[args] : false;
    //     } else if (Array.isArray(args)) {
    //         let tmp = {};
    //         for (let i = 0; i < args.length; i++) {
    //             if (!!getterObject[args[i]]) {
    //                 tmp[args[i]] = getterObject[args[i]];
    //             }
    //         }
    //         return (!Object.keys(tmp).length) ? false : tmp;
    //     }
    //     return false;
    // }

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
        let setterVal = setter(configurations, options);
        if (!!setterVal) {
            configurations = setterVal;
            return setterVal;
        }
        return false;
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
        let proxy = startProxy(inst.config);

        inst.proxy = proxy;
        inst.proxy.listen(inst.config.listenPort);

        if (!!inst.handlers) {
            let hKeys = Object.keys(inst.handlers);
            let hKeysLen = hKeys.length;
            for (let i = 0; i < hKeysLen; i++) {
                inst.proxy.on(hKeys[i], inst.handlers[hKeys[i]]);
            }
        }

        let proxyObject = {};
        proxyObject[name] = inst;

        let setInst = setter(instanceProxyServers, proxyObject);
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
        // let validConfig = utils.isEqual(configurationObject, config, false, false);
        let validPort = [];
        for (let i = 0; i < proxyPortRanges.length; i++) {
            if ((config.options.target.port >= proxyPortRanges[i][0] && config.options.target.port <= proxyPortRanges[i][1])) {
                break;
            }
        }
        if (validPort.length > 0) { return false; }

        let hKeys = Object.keys(handlerFunctions);
        for (let i = 0; i < hKeys.length; i++) {
            if (!(validProxyHandlers.includes(hKeys[i]))) {
                return false;
            }
        }

        let proxyObject = {};
        proxyObject[name] = { "proxy": null, "config": config, "handlers": handlerFunctions };

        let proxyset = setter(instanceProxyServers, proxyObject);
        // console.log("proxyset", proxyset, instanceProxyServers);
        if (!proxyset) { return false; }

        return true;
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
        os: {
            set: setOS,
            get: getOS
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
