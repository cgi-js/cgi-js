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

/**
 * 
 * handler
 * 
 * @returns
 */
function handler() {
    let config = {}, connections = {}, processes = {}, serverCommands = {};
    let instanceServers = {};
    let serverPortRanges = [[8000, 9000], [10000, 15000]];
    let validProxyHandlers = ["error", "proxyRes", "open", "data", "end", "close", "upgrade"];
    let osList = ["win32", "win64", "darwin", "unix", "linux", "fedora", "debian"];
    let serverList = ["httpd", "tomcat", "mongoose", "putty", "nginx", "mysql", "pgsql"];
    let processList = [];
    let commandObject = {
        generic: {
            executable: {
                name: "", exe: '', env: { bin: "", runtime: "" },
                commands: {
                    start: { usage: "start", args: {} },
                    stop: { usage: "stop", args: {} },
                    restart: { usage: "restart", args: {} }
                }
            },
            service: {
                name: "", exe: '', env: { bin: "", runtime: "" },
                commands: {
                    start: { usage: "start", args: {} },
                    stop: { usage: "stop", args: {} },
                    restart: { usage: "restart", args: {} }
                }
            }
        },
        os: {
            "osname": {
                executable: {
                    name: "", exe: '', env: { bin: "", runtime: "" },
                    commands: {
                        start: { usage: "start", args: {} },
                        stop: { usage: "stop", args: {} },
                        restart: { usage: "restart", args: {} }
                    }
                },
                service: {
                    name: "", exe: '', env: { bin: "", runtime: "" },
                    commands: {
                        start: { usage: "start", args: {} },
                        stop: { usage: "stop", args: {} },
                        restart: { usage: "restart", args: {} }
                    }
                }
            }
        }
    };
    function setOS(obj) { }
    function getOS(name) { }
    function setServers(obj) { }
    function getServers(name) { }
    function setProcesses(obj) { }
    function getProcesses(name) { }

    /**
     * 
     * setter
     *
     * @param {*} setterObject
     * @param {*} values
     * 
     * @returns
     * 
     */
    function setter(setterObject, values) {
        if (!values) {
            return false;
        }
        keys = values.keys();
        for (let i = 0; i < keys.length; i++) {
            setterObject[keys[i]] = values[key[i]];
        }
        return true;
    }

    /**
     * 
     * getter
     *
     * @param {*} getterObject
     * 
     * @param {*} args
     * 
     * @returns
     * 
     */
    function getter(getterObject, args) {
        if (!!args) {
            if (typeof args === "string" || typeof args === "number") {
                return getterObject[args];
            } else if (Array.isArray(args)) {
                let tmp = {};
                for (let i = 0; i < args.length; i++) {
                    if (!!getterObject[args[i]]) {
                        tmp[args[i]] = getterObject[args[i]];
                    }
                }
                return tmp;
            }
        }
        return {};
    }

    /**
     * 
     * getConfig
     * Returns the config of requested args
     * can be single key, or array of keys or complete config object for fetch
     *
     * @param {undefined, String, Array} args
     * args is either single config string key or Array of keys to be fetched
     * @returns {*} config
     * config: configurations object
     * 
     */
    function getConfig(args) {
        return getter(config, args);
    }

    /**
     * 
     * setConfig
     * Sets the key of the config provided
     * can be single or multiple keys or complete config object for setting config
     *
     * @param {undefined, Object} options
     * options is the an object of configuration with names of config as keys
     * @returns {bool} 
     * 
     */
    function setConfig(options) {
        return setter(config, options);
    }

    /**
     * 
     * getConn
     * Returns the connections requested
     * can be single key, or array of keys or complete connections object for fetch
     *
     * @param {undefined, String, Array} connectionNames
     * connectionNames : single name of connection or array of connections to be fetched
     * 
     * @returns {*} connections
     * connections: connections object
     * 
     */
    function getConnection(connectionNames) {
        return getter(connections, connectionNames);
    }

    /**
     * 
     * setConn
     * Sets the connection of the connection key name provided
     * can be single or multiple keys or complete connection object for setting connections
     *
     * @param {undefined, Object} connectionObject
     * connectionObject is an object of connections with single or 
     *      multiple connections object (name as key and connectionObject as value) to be set
     * @returns {bool}
     * 
     */
    function setConnection(connectionObject) {
        return setter(connections, connectionObject);
    }

    /**
     * 
     * getProcess
     * Returns the processes requested
     *      can be single key, or array of keys or complete process object for fetch
     *
     * @param {undefined, String, Array} processIds
     * processIds is single or Array of ids
     * @returns {Object} processes
     * processes: processes list object
     * 
     */
    function getProcess(processIds) {
        return getter(processes, processIds);
    }

    /**
     * 
     * setProcess
     * Sets the process of the connection key procId provided
     *      can be single or multiple keys or complete process object for setting processes
     *
     * @param {undefined, object} processObject
     * 
     */
    function setProcess(processObject) {
        return setter(processes, processObject);
    }

    /**
     * 
     * startProcess
     * 
     *
     * @param {Object} processObject
     * Defines the process Object needed to start the process
     * Expected Structure: { generic, os }
     * 
     * process/server/database = {generic: {executable: defobject, service: defobject}, os: { "osname": {executable: defobject, os: defobject} }}
     *      defobject = {name: value, exe: value, env: {}, commands: {start: usageobject, stop: usageobject, restart: usageobject }}
     *      usageobject = {usage: value, args: {value / {key:value}}, options: {value / {key:value}}}
     * 
     * @param {*} file
     * 
     * @returns
     * 
     */
    function startProcess(processObject, file) {
        // {name: {commands, instances: {pid: instance}}}
        // REDO THIS
        let processSpawn = require('child_process').spawn;
        let { exe, args, options, other } = processObject;
        args.conf = !!other.osPaths.conf ?
            (other.osPaths.conf + args.conf) : args.conf;
        exe = other.osPaths.exe + exe;
        if (!!other.serverType && !!other.command && !!file) {
            error("Server definition or process definition allowed, not both");
        }
        let e = args.entries().flat(Infinity);
        if (!!other.command && !file) { e.push(other[other.command]); }
        if (!!file && !other.serverType) { e.push(file); }
        let proc = processSpawn(exe, [...e], options);
        process.stdin.resume();
        proc.on('data', function (data) {
            console.log(data);
        });
        function cleanUpServer(options, exitCode) {
            console.log("Event Type", eventType);
            if (options.cleanup) console.log('clean');
            if (exitCode || exitCode === 0) console.log(exitCode);
            if (options.exit) process.exit();
        }
        [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach(function (eventType) {
            proc.on(eventType, cleanUpServer.bind(null, eventType));
        }.bind(proc, cleanUpServer));
        processes[proc.pid] = proc;
        return { pid: proc.pid, srv: processObject };
    }

    /**
     * 
     * stopProcess
     *
     * @param {*} proc
     */
    function stopProcess(proc, signal) {
        process.kill(proc, signal);
        console.log('Killed/Stopped process ' + processes[proc].pid);
        processes[proc] = null;
        process.stdin.end();
        return true;
    }

    /**
     * 
     * startProxy
     *
     * @param {*} config
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
     * @param {string, Object} proxy
     */
    function stopProxy(proxy) {
        if (!proxy) {
            return false;
        }
        if (!!proxy && (typeof proxy === "string" || typeof args === "number")) {
            proxy = instanceServers[proxy].proxy;
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
     * @param {*} name
     */
    function serveProxy(name) {
        let proxy = startProxy(instanceServers[name].config);
        instanceServers[name].proxy = proxy;
        instanceServers[name].proxy.listen(instanceServers[name].config.listenPort);
        let hKeys = Object.keys(instanceServers[name].handlers);
        let hKeysLen = hKeys.length;
        for (let i = 0; i < hKeysLen; i++) {
            instanceServers[name].proxy.on(hKeys[i], instanceServers[name].handlers[hKeys[i]]);
        }
        return instanceServers[name];
    }

    /**
     *
     * setupProxy
     *
     * @param {*} name
     * @param {*} config
     * @param {*} handlerFunctions
     * @returns {bool} options and handlers validated and saved to servers object
     */
    function setupProxy(name, config, handlerFunctions) {
        let validPort = [];
        for (let i = 0; i < serverPortRanges.length; i++) {
            if (!(config.options.port >= serverPortRanges[i][0] && config.options.port <= serverPortRanges[i][1])) {
                validPort.push(false);
            }
        }
        if (false in validPort) { return false; }
        let hKeys = Object.keys(handlerFunctions);
        for (let i = 0; i < hKeys.length; i++) {
            if (!(hKeys[i] in validProxyHandlers)) { return false; }
        }
        instanceServers[name] = {
            proxy: null,
            config: config,
            handlers: handlerFunctions
        };
        return true;
    }

    /**
     * @param  {} name
     */
    function getProxy(name) {
        let proxy = instanceServers[name];
        if (!proxy) {
            return false;
        }
        return proxy;
    }

    /**
     * 
     * startServer
     * 
     *
     * @param {*} server
     * Expected Structure: { exe, args, options, other }
     *      exe: executable for process, 
     *      args: arguments for process, 
     *      options: options for process,
     *      useDefault: key provided if system defaults should be used and not to use embedded executable
     *      other: optional-more-for-server-processes
     *          Expected Structure: { serverType, host, port, command, conf, starter, stopper, restarter, osPaths: { conf, exe } }
     * Example:
     * { exe, args, options, other: { serverType, host, port, command, conf, starter, stopper, restarter, osPaths: { conf, exe } } }
     * 
     * @returns
     * 
     */
    function startServer(server) {
        let srv;
        if (server.hasOwnProperty("useDefault") && server.useDefault !== true) {
            srv = server;
        } else {
            srv = serverCommands[server.server];
            let keys = server.keys();
            for (let i = 0; i < keys.length; i++) {
                srv = (!!serverCommands[keys[i]]) ? server[keys[i]] : serverCommands[keys[i]];
            }
        }
        return startProcess(srv);
    }

    /**
     * @param  {} server
     */
    function stopServer(server) {
        if (!!server.other && !!server.other.serverType) {
            server = startProcess(server.srv);
            if (!server.pid) { return true; }
            return false;
        } else {
            if (!!stopProcess(server.pid, 'EXIT')) { return true; }
            return false;
        }
    }

    return {
        setter: {
            config: setConfig,
            connection: setConnection,
            os: setOS,
            servers: setServers,
            process: setProcess,
            processes: setProcesses
        },
        getter: {
            config: getConfig,
            connection: getConnection,
            process: getProcess,
            os: getOS,
            servers: getServers,
            processes: getProcesses,
            proxy: getProxy
        },
        process: {
            start: startProcess,
            stop: stopProcess,
            get: getProcesses,
            getProcess: getProcess,
            set: setProcesses
        },
        proxy: {
            start: startProxy,
            stop: stopProxy,
            serve: serveProxy,
            setup: setupProxy,
            get: getProxy
        },
        server: {
            start: startServer,
            stop: stopServer,
            set: setServers,
            get: getServers
        }
    }
}

module.exports = handler;
