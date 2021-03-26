/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/

/* eslint no-console: 0 */
const https = require('https');
const fs = require('fs');
const utils = require("./utils")();

/**
 * 
 * handler
 * 
 * @returns
 */
function handler() {
    let processes = {}, processCommands = {};
    let osList = ["win32", "win64", "darwin", "unix", "linux", "fedora", "debian"];
    let processList = ["httpd", "tomcat", "mongoose", "putty", "nginx", "mysql", "pgsql", "top", "mysql", "mongodb", "pgsql"];

    let commandObject = {
        name: "", type: "executable", env: { os: { "name": { bin: "", runtime: "", exe: '' } } },
        cmds: {
            start: { usage: "start", args: [] },
            stop: { usage: "stop", args: [] },
            restart: { usage: "restart", args: [] }
        }
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
            case "processList":
                if (Array.isArray(optionsObject)) {
                    for (let i = 0; i < optionsObject.length; i++) {
                        if (optionsObject[i] in processList) {
                            processList.push(optionsObject[i]);
                        }
                    }
                    return true;
                }
                return false;
            case "processCommands":
                if (typeof optionsObject === "object") {
                    let valid = utils.isEqual(commandObject, optionsObject);
                    if (!valid || !optionsObject.name) {
                        return false;
                    }
                    processCommands[optionsObject.name] = optionsObject;
                    return true;
                } else if (Array.isArray(optionsObject)) {
                    let oKeys = Object.keys(optionsObject);
                    for (let i = 0; i < optionsObject.length; i++) {
                        let valid = utils.isEqual(commandObject, optionsObject[i]);
                        if (!valid || !optionsObject[i].name) {
                            return false;
                        }
                        processCommands[optionsObject[oKeys[i]].name] = optionsObject[oKeys[i]];
                        return true;
                    }
                }
                return false;
            default:
                return false;
        }
    }

    function setOS(obj) { }

    function getOS(name) { }


    /**
     * 
     * setter
     * 
     *
     * @param {Object} setterObject
     * 
     * @param {Object} values
     * 
     * @returns
     * 
     */
    function setter(setterObject, values) {
        if (!values && typeof values !== "object") { return false; }
        keys = Object.keys(values);
        if (!keys.length) { return false; }
        for (let i = 0; i < keys.length; i++) {
            setterObject[keys[i]] = values[keys[i]];
        }
        return true;
    }

    /**
     * 
     * getter
     * 
     *
     * @param {Object} getterObject
     * 
     * @param {String, Array} args
     * 
     * @returns {Boolean}
     * 
     */
    function getter(getterObject, args) {
        if (!args) { return false; }
        if (typeof args === "string" || typeof args === "number") {
            return (!!getterObject[args]) ? getterObject[args] : false;
        } else if (Array.isArray(args)) {
            let tmp = {};
            for (let i = 0; i < args.length; i++) {
                if (!!getterObject[args[i]]) {
                    tmp[args[i]] = getterObject[args[i]];
                }
            }
            return (!Object.keys(tmp).length) ? false : tmp;
        }
        return false;
    }


    /**
     * 
     * getProcess
     * Returns the processes requested
     *
     * @param {String, Array} processIds
     *      processIds is single or Array of ids
     * 
     * @returns {Boolean, Object} processes
     *      processes: processes list object
     * 
     */
    function getProcess(processIds) {
        return getter(processes, processIds);
    }

    /**
     * 
     * setProcess
     * Sets the process of the connection key procId provided
     *
     * @param {Object} processConf
     * 
     * @returns {Boolean}
     * 
     */
    function setProcess(processConf) {
        return setter(processes, processConf);
    }

    /**
     * 
     * execCommand
     * 
     * 
     * @param {String} exe
     * 
     * @param {Array Object} e
     * 
     * @param {Function} proc
     *
     */
    function execCommand(exe, e, dataHandler) {
        let ex = require('child_process').exec;
        return ex([exe, ...e].join(" "), function (error, stdout, stderr) {
            dataHandler(error, stdout, stderr);
        });
    }

    /**
     * 
     * registerEventHandlers
     * 
     * 
     * @param {Object} proc
     * 
     * @param {Object} eventHandlers
     * { event : { data: dataObject, handler: eventHandlerFunction } }
     * 
     */
    function registerEventHandlers(proc, eventHandlers) {
        let eKeys = eventHandlers.keys();
        let eKeysLen = eKeys.length;

        function cleanup(eventType, exitFunction, data, proc) {
            console.log('registerEventHandlers: Cleanup Fnc EventType and Process PID: ', eventType, proc.pid);
            exitFunction(data, proc);
        }

        for (let e = 0; e < eKeysLen; e++) {
            let { data, handler } = eventHandlers[eKeys[e]];
            proc.on(eKeys[e], cleanup.bind(null, eKeys[e], handler, data, proc));
        }
        return proc;
    }

    /**
     * 
     * startProcess
     * 
     *
     * @param {Object} processConf
     * Defines the process Object needed to start the process
     * Expected Structure: {  }
     * 
     * process/server/database = 
     *  
     * @param {String} file
     * 
     * @param {Function} dataHandler
     * 
     * @param {Function} cleanupFnc
     * 
     * @returns {Object}
     * { pid: Number, process: Object, conf: Object }
     * 
     */
    function startProcess(processConf, file, dataHandler, cleanupFnc) {
        // {name: {commands, instances: {pid: instance}}}
        let { exe, args, options, other } = processConf;

        args.conf == !!other.osPaths.conf ?
            (other.osPaths.conf + args.conf) :
            (!!args.conf) ? args.conf : "";
        exe = other.osPaths.exe + exe;
        if (!!other.serverType && !!other.command && !!file) {
            error("startProcess: Server Definition or Process Definition allowed, not both");
        }

        let e = !!args ? args : [];
        if (!!other.command && !file) { e.push(other[other.command]); }
        if (!!file && !other.serverType) { e.push(file); }

        let proc = execCommand(exe, e, dataHandler);
        process.stdin.resume();

        function cleanupSrv(eventType, exitFunction, proc) {
            console.log('startProcess: Cleanup Fnc EventType and Process PID: ', eventType, proc.pid);
            exitFunction(options, proc);
        }

        let tmp = {};
        tmp[proc.pid] = { process: proc, conf: processConf };

        let bln = setProcess(tmp);
        if (!!bln) { /* Do something here - callback */ }

        // Signal Numbers
        // http://people.cs.pitt.edu/~alanjawi/cs449/code/shell/UnixSignals.htm
        let evt = [
            `exit`, `SIGHUP`, `SIGQUIT`, `SIGKILL`, `SIGINT`,
            `SIGTERM`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`
        ];
        evtLen = evt.length;

        for (let i = 0; i < evtLen; i++) {
            proc.on(evt[i], cleanupSrv.bind(null, evt[i], cleanupFnc, proc));
        }
        return { pid: proc.pid, process: proc, conf: processConf };
    }

    /**
     * 
     * startProcessAsync
     * All arguments and structure are the same but are async promises
     *
     * @param {Object} processConf
     * Defines the process Object needed to start the process
     * Expected Structure: {  }
     * 
     * process/server/database = 
     * 
     * @param {String} file
     * 
     * @param {Function} dataHandler
     * 
     * @param {Function} cleanupFnc
     * 
     * @returns {Object}
     * 
     */
    function startProcessAsync(processConf, file, dataHandler, cleanupHandler) {

    }

    /**
     * 
     * killProcess
     * 
     * 
     * @param {Number} pid
     * 
     * @returns {Boolean}
     * 
     */
    function killProcess(pid, signal) {
        let proc = getProcess(pid)['process'];
        proc.kill(signal);
        proc.stdin.end();
        let ob = {};
        ob[pid] = null;
        setter(processes, ob);
        console.log('Killed/Stopped process ' + pid, "Object is ", processes[pid]);
        return true;
    }

    /**
     * 
     * execProcess
     * 
     * 
     * @param {Object} conf
     * 
     * @param {Function} dataHandler
     *  
     * @returns {Boolean, Object}
     * false / Process Instance
     * 
     */
    function execProcess(conf, dataHandler) {
        if (!!conf.command && typeof conf.command === "string") {
            try {
                return execCommand(conf.command, [], dataHandler);
            } catch (e) {
                console.log("execProcess: Error occured: ", e.toString());
                return false;
            }
        }
        let cmdObj = getter(processCommands, conf.name);
        if (!!cmdObj) {
            // TODO: TEMP: Following two statements to be tested
            let exe = cmdObj.env.os[conf.os]['bin'] + "/" + cmdObj.env.os[conf.os]['exe'];
            let e = [cmdObj.cmds[conf.cmd]['usage'], ...cmdObj.cmds[conf.cmd]["args"]];
            return execCommand(exe, e, dataHandler);
        }
        return false;
    }

    /**
     * 
     * setServers
     * 
     * 
     * @param  {Object} obj
     * Expected Structure: { commandObject }
     * 
     * @returns {Boolean}
     * 
     */
    function setServers(obj) { }

    /**
     * 
     * getServers
     * 
     * 
     * @param  {String} name
     * 
     * @returns {Boolean, Object}
     * false / ServerInstance { process, processCommandsKey }
     * 
     */
    function getServers(name) { }

    /**
     * 
     * startServer
     * 
     * 
     * @param {String} name
     *       
     * @returns {Boolean}
     * 
     */
    function startServer(name) { }

    /**
     * 
     * stopServer
     * 
     * 
     * @param  {String} name
     * 
     * @returns {Boolean} 
     * 
     */
    function stopServer(name) {
        // if (!!stopProcess(server.pid, 'EXIT')) { return true; }
    }

    /**
     * 
     * restartServer
     * 
     * 
     * @param  {} server
     * 
     * @returns {Boolean} 
     * 
     */
    function restartServer(server) {

    }

    return {
        setup: setupHandler,
        os: {
            set: setOS,
            get: getOS
        },
        process: {
            set: setProcess,
            get: getProcess,
            start: startProcess,
            startAsync: startProcessAsync,
            exec: execProcess,
            registerHandlers: registerEventHandlers,
            kill: killProcess
        },
        server: {
            set: setServers,
            get: getServers,
            start: startServer,
            stop: stopServer,
            restart: restartServer
        }
    }
}

module.exports = handler;
