/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/

/* eslint no-console: 0 */
const https = require('https');
const fs = require('fs');
const util = require("util");
const process = require('process');
const execPath = process.execPath;
const utils = require("./utils")();
const setter = utils.setter, getter = utils.getter;

/**
 * 
 * handler
 * 
 * @returns
 */
function handler() {
    let processes = {}, processCommands = {};

    let osList = ["win32", "win64", "darwin", "unix", "linux", "fedora", "debian"];
    let executableOptions = ["executable", "service"];
    let processList = ["httpd", "tomcat", "mongoose", "putty", "nginx", "mysql", "pgsql", "top", "mysql", "mongodb", "pgsql"];

    let commandObject = {
        name: "",
        // --> executableOptions
        type: "executable",
        // --> osList
        os: "",
        // --> any executable or systemctl
        exe: "",
        cmds: {
            start: { usage: "start", args: [] },
            stop: { usage: "stop", args: [] },
            restart: { usage: "restart", args: [] },
            generic: { usage: "", args: [] }
        },
        options: {},
        other: {
            paths: {
                "conf": "",
                "exe": ""
            },
            env: ""
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


    function setOS(obj) {
        if (typeof obj == "string") {
            osList.push(obj)
            return true;
        }
        return false;
    }


    /**
     * 
    */
    function getOS(name) {
        if ((typeof obj == "string") && (osList.indexOf(name) !== -1)) {
            return name;
        }
        return false;
    }


    /**
     * 
     * getProcess
     * Returns the processes requested
     *
     * @param {String, Array} processNames
     *      processNames is single or Array of ids
     * 
     * @returns {Boolean, Object} processes
     *      processes: processes list object
     * 
     */
    function getProcess(processNames) {
        return getter(processes, processNames);
    }


    /**
     * 
     * setProcess
     * Sets the process of the connection key procId provided
     *
     * @param {Object} processConf
     * 
     * @returns {Boolean || Object}
     * 
     */
    function setProcess(processConf) {
        let setterVal = setter(processes, processConf);
        if (!!setterVal) {
            processes = setterVal;
            return processes;
        }
        return false;
    }


    /**
     * 
     * execCommand
     * 
     * 
     * @param {String} exe
     * 
     * @param {Array Object} args
     * 
     * @param {Object} cmdOptions
     * 
     * @param {Function} proc
     *
     */
    function execCommand(exe, args, cmdOptions, dataHandler) {
        let ex = require('child_process').exec;
        return ex([exe, ...args].join(" "), cmdOptions, function (error, stdout, stderr) {
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
     * executeProcess
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
     * @param {Function} cleanupHandler
     * 
     * @returns {Object}
     * { pid: Number, process: Object, conf: Object }
     * 
     */
    function executeProcess(processConf, dataHandler, cleanupHandler) {
        // {name: {commands, instances: {pid: instance}}}
        let proc, usage, args;
        let tmp = {};

        // Signal Numbers - http://people.cs.pitt.edu/~alanjawi/cs449/code/shell/UnixSignals.htm
        let evt = [`exit`, `SIGHUP`, `SIGQUIT`, `SIGKILL`, `SIGINT`, `SIGTERM`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`];
        let evtLen = evt.length;

        let { name, exe, cmds, os, type, options, other } = processConf;

        if (!executableOptions.includes(type)) {
            utils.error("startProcess: Server Definition or Process Definition does not include type");
        }

        exe = other.paths.exe + exe;
        if (!!other.command) {
            if (!cmds[other.command] && (cmds[other.command] != "" || cmds[other.command] != {})) {
                utils.error("startProcess: Server Definition or Process Definition not allowed");
            } else {
                usage = cmds[other.command]["usage"];
                args = cmds[other.command]["args"];
            }
        }

        if (!other.command) {
            utils.error("startProcess: Server Definition or Process Definition does not have command to execute");
        }

        if (!usage) {
            usage = "";
        } else if (!!usage && usage != "") {
            utils.error("startProcess: Usage passed is incorrect");
        }

        if (!args) {
            args = [];
        } else if (!!args && !Array.isArray(args)) {
            utils.error("startProcess: Arguments passed is incorrect");
        }

        if (!dataHandler && (typeof dataHandler === "function" || dataHandler instanceof Function || Object.prototype.toString().call(dataHandler) == "[object Function]")) {
            let dataHandler = (error, stdout, stderr) => { };
        }

        if (!cleanupHandler && (typeof cleanupHandler === "function" || cleanupHandler instanceof Function || Object.prototype.toString().call(cleanupHandler) == "[object Function]")) {
            let cleanupHandler = (options, prc) => { };
        }

        proc = execCommand(exe, args, options, dataHandler);
        process.stdin.resume();

        function cleanupSrv(eventType, exitFunction, proc) {
            console.log('startProcess: Cleanup Function, EventType, and Process PID: ', eventType, proc.pid);
            exitFunction(options, proc);
        }

        tmp[name] = { name: processConf.name, process: proc, pid: proc.pid, conf: processConf };

        if (!!other.setprocess) {
            bln = setProcess(tmp);
            if (!!bln) { /* Do something here - callback */ }
        }

        for (let i = 0; i < evtLen; i++) {
            proc.on(evt[i], cleanupSrv.bind(null, evt[i], cleanupHandler, proc));
        }

        return tmp[name];
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
                return execCommand(conf.command, [], conf.options, dataHandler);
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
            return execCommand(exe, e, conf.options, dataHandler);
        }
        return false;
    }


    /**
     * 
     * execCommandAsync
     * 
     * 
     * @param {String} exe
     * 
     * @param {Array Object} args
     * 
     * @param {Object} cmdOptions
     * 
     * @param {Function} proc
     *
     */
    function execCommandAsync(exe, args, cmdOptions, dataHandler) {
        let ex = require('child_process').exec;
        return new Promise(function (resolve, reject) {
            ex([exe, ...args].join(" "), {}, function (err, stdout, stderr) {
                if (!!err) {
                    reject({ stdout: stdout, stderr: stderr });
                }
                resolve({ stdout: stdout, stderr: stderr });
            }.bind(args, resolve, reject));
        });
        // let ex = util.promisify(require('child_process').exec);
        // return ex([exe, ...args].join(" "), cmdOptions);
    }


    /**
     * 
     * TODO
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
     * @param {Function} cleanupHandler
     * 
     * @returns {Object}
     * 
     */
    function startProcessAsync(processConf, file, dataHandler, cleanupHandler) {
        return false;
    }


    /**
     * 
     * TODO
     * execProcessAsync
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
    function execProcessAsync(conf, dataHandler) {
        return new Promise(function (resolve, reject) {

        });
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
        try {
            let proc = getProcess(pid)['process'], ob = {}, setterVal = null;
            proc.kill(signal);
            proc.stdin.end();
            ob[pid] = null;
            setterVal = setter(processes, ob);
            if (!setterVal) {
                console.error("killProcess: Error during setting object to null");
            }
            console.log('killProcess: Killed/Stopped process ' + pid, "Object is ", processes[pid]);
            return true;
        } catch (e) {
            return false;
        }
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
    function setServers(obj) {
        if (utils.isEqual(commandObject, obj, true, true)) {
            let setterVal = setter(processCommands, obj);
            return true;
        }
        return false;
    }


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
    function getServers(name) {
        if (processCommands.keys().indexOf(name) !== -1) {
            return processCommands[name];
        }
        return false;
    }


    /**
     * 
     * serverCommands
     * 
     * @param {*} action 
     * 
     * @param {*} name 
     * 
     * @param {*} fnc 
     * 
     * @returns {Boolean, Object}
     * 
     */
    function serverCommands(action, name, fnc) {
        let srv = getServers(name)
        if (!!srv) {
            return execCommand(srv["exe"], [srv["cmds"][action]["usage"], ...srv["cmds"][action]["args"]], {}, fnc);
        }
        return false;
    }


    /**
     * 
     * startServer
     * 
     * 
     * @param {String} name
     * 
     * @param  {Function} fnc
     *       
     * @returns {Boolean, Object}
     * 
     */
    function startServer(name, fnc) {
        return serverCommands("start", name, fnc);
    }


    /**
     * 
     * stopServer
     * 
     * 
     * @param  {String} name
     * 
     * @param  {Function} fnc
     * 
     * @returns {Boolean, Object} 
     * 
     */
    function stopServer(name, fnc) {
        try {
            return serverCommands("stop", name, fnc);
        } catch (error) {
            try {
                let s = getServers(name);
                if (typeof s !== "boolean") {
                    process.kill(s.pid, "EXIT");
                    return true;
                }
            } catch (err) {
                return false;
            }
        }
        return false;
    }


    /**
     * 
     * restartServer
     * 
     * 
     * @param  {String} server name
     * 
     * @param  {Function} fnc
     * 
     * @returns {Boolean} 
     * 
     */
    function restartServer(name, fnc) {
        return serverCommands("restart", name, fnc);
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
            registerHandlers: registerEventHandlers,
            execute: execCommand,
            execProcess: executeProcess,
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
