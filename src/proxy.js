/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/

/* eslint no-console: 0 */
const net = require("net");
const httpProxy = require('http-proxy');
const utils = require("./utils")();
const setter = utils.setter, getter = utils.getter, error = utils.error, osList = utils.os, processList = utils.processes, executableOptionList = utils.executableOptions;
const socks = require("socks");
const udpproxy = require("udp-proxy");
const httpproxy = require("http-proxy");
const socketproxy = require("socket-proxy");
const http2socks = require("http-proxy-to-socks");


/** @typedef { { [eventname:string]: (data: any) => any } } HandlerFunctionsObject */
/** @typedef {{ prop1: string, prop2: (data: any) => any, prop3?: number }} ExampleSpecialType */
/** @typedef {(data: string, index?: number) => boolean} ExamplePredicate */


/**
 * 
 * handler
 * Proxy Management handler
 * 
 * 
 * @returns { ProxyObject<{ 
 *                  setup: setupHandler, init: undefined, 
 *                  config: { 
 *                      set: setConfig, 
 *                      get: getConfig 
 *                  }, 
 *                  proxy: { 
 *                      socks: socks, udp: udpproxy, http: httpproxy, 
 *                      tcp: socketproxy, 
 *                      redirect: { 
 *                          http2socks: http2socks 
 *                      }, 
 *                      setup: setupProxy, 
 *                      get: getProxy, 
 *                      start: startProxy, 
 *                      stop: stopProxy, 
 *                      serve: serveProxy 
 *                  } 
 *           }> }
 * 
 *      Proxy module functions.
 *      Module Object ==> { ProxyObject }
 * 
 */
function handler() {
    let configurations = {}, instanceProxyServers = {};

    let proxyPortRanges = [[8000, 9500], [10000, 15000]];
    let validProxyHandlers = ["error", "proxyReq", "proxyRes", "open", "data", "end", "close", "upgrade"];
    // let osList = ["win32", "win64", "Windows_NT", "darwin", "unix", "linux", "fedora", "debian"];

    let configurationObject = require("./configs").proxy;

    /**
     * 
     * setupHandler
     * 
     * 
     * @param { String } [name] 
     * 
     * @param { Array } [optionsObject] 
     * 
     * @returns { Boolean } 
     * Returns Boolean (true/false) based on whether the options have been set or not
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
     * 
     * getConfig
     * 
     *
     * @param { String | Array } args
     *      args is either single configuration string key or Array of keys to be fetched
     * 
     * @returns { Boolean | Object } configurationsObject
     * 
     *      configurations: configurations object.
     * Returns all configurations objects based on passed args
     * 
     */
    function getConfig(args) {
        return getter(configurations, args);
    }


    /**
     * 
     * setConfig
     * 
     * 
     * @param { Object } options
     *      options is the an object of configuration with names of configuration as keys
     * 
     * @returns { Boolean | Object } configurationsObject
     * 
     *      configurations: configurations object.
     * Returns all configurations objects after the set is done
     * 
     */
    function setConfig(options) {
        return setter(configurations, options);
    }


    /**
     * 
     * startProxy
     * 
     * TODO:
     * Adding TCP, UDP, Socks Protocols for proxy.
     * Avoid breaking change and add differentiator in config
     * 
     *
     * @param { Object } config
     * 
     * @returns { Boolean | Object } proxyInstance
     * 
     *      proxyInstance: proxy Instance Object.
     * Returns proxyInstance Object / Boolean (false) based on whether proxy has been created or not
     * 
     */
    function startProxy(config) {
        try {
            if (!!config.stream || !!config.modify || !!config.runtime) {
                return new httpProxy();
            } else {
                return httpProxy.createProxyServer(config.options);
            }
        } catch (e) {
            return false;
        }
    }


    /**
     * 
     * stopProxy
     * 
     * TODO:
     * Adding TCP, UDP, Socks Protocols for proxy.
     * Avoid breaking change and add differentiator in config
     * 
     *
     * @param { String | Object } proxy
     * 
     * @returns { Boolean } ?stopped
     * 
     * Returns if proxy has been stopped or not
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
     * TODO:
     * Adding TCP, UDP, Socks Protocols for proxy.
     * Avoid breaking change and add differentiator in config
     * 
     *
     * @param { String } [name]
     * 
     * @returns { Boolean | Object } proxyInstance
     * 
     *      proxyInstance: proxy Instance Object.
     * Returns proxyInstance Object / Boolean (false) based on whether proxy has been started or not
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
     * TODO:
     * Adding TCP, UDP, Socks Protocols for proxy.
     * Avoid breaking change and add differentiator in config
     *
     * @type HandlerFunctionsObject 
     * 
     * @param { String } [name]
     * 
     * @param { Object } [config]
     * 
     * @param { { [eventname:string]: (data: any) => any } } [handlerFunctions]
     * 
     * @returns { Boolean } ?setup
     * 
     * Returns Boolean (true/false) based on whether the Proxy has been fetched or not 
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
     * @param  { String | Array } [name]
     * 
     * @returns { Boolean | Object } proxyInstance
     * 
     *      proxyInstance: proxy Instance Object.
     * Returns instance of proxy - ProxyInstance<{ proxy, config, handlers }> or Boolean (false) based on whether the Proxy has been fetched
     * 
     */
    function getProxy(name) {
        return getter(instanceProxyServers, name);
    }


    return {
        setup: setupHandler,
        // Serve any proxy using the commong .init function - HTTP/WS, UDP, TCP, Socks, Sockets, gRPC.
        init: undefined,
        config: {
            set: setConfig,
            get: getConfig
        },
        proxy: {
            socks: socks,
            udp: udpproxy,
            http: httpproxy,
            tcp: socketproxy,
            redirect: {
                // wsevents2events: eventPatternfncs,
                // http2events: eventPatternfncs
                // http2messageProtocol: messagePatternfncs
                http2socks: http2socks
            },
            setup: setupProxy,
            get: getProxy,
            start: startProxy,
            stop: stopProxy,
            serve: serveProxy
        }
    }
}

module.exports = handler;
