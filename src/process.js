/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/

/* eslint no-console: 0 */
const process = require('process');
const path = require("path");
const execPath = process.execPath;
const utils = require("./utils")();
const setter = utils.setter, getter = utils.getter, error = utils.error, osList = utils.os, processList = utils.processes, executableOptionList = utils.executableOptions;


/**
 * 
 * handler
 * Process Execution and Management handler
 * 
 * 
 * @returns {Object} Process module functions
 *      Module Object ==> { Process Object }
 * 
 *              setup [function]
 *              os [object]: {
 *                  set [function],
 *                  isValid [function],
 *                  get [function]
 *              }
 *              process [object]: { 
 *                  set [function],
 *                  get [function],
 *                  registerHandlers [function],
 *                  exec [function],
 *                  execFile [function],
 *                  fork [function],
 *                  spawn [function],
 *                  executeProcess [function],
 *                  executeAction [function],
 *                  kill [function]
 *              }
 * 
 */
function handler() {
    let processes = {};

    // let osList = ["win32", "win64", "Windows_NT", "darwin", "unix", "linux", "fedora", "debian"];
    // let executableOptions = ["executable", "service", "file"];
    // let processList = ["httpd", "tomcat", "mongoose", "putty", "nginx", "mysql", "pgsql", "top", "mysql", "mongodb", "pgsql"];

    let commandObject = {
        // name of the object that it should be stored or identifies as 
        name: "",
        // type --> One of the executableOptions options
        type: "executable",
        // os --> Any os in the osList
        os: "",
        // exe --> any executable or systemctl
        exe: "",
        // cmds will have list of actions/ prestored commands that may be needed for executing the process
        // cmds action execution will be controlled by and 
        //        depend on whether `other.command` key is specified during execution
        cmds: {
            start: { usage: "start", args: [] },
            stop: { usage: "stop", args: [] },
            restart: { usage: "restart", args: [] },
            // exe is optional and can be used if you want to override 
            //      the commandObject[exe] value for a specific command in commandObject[exe][cmds]
            generic: { exe: "", usage: "", args: [] }
        },
        // shell options for nodejs process `exec` function definition
        //      Will be passed as an arg for `process.exec` function inside implementation under the hood
        //      Defaults to { stdio: 'inherit', shell: true }
        options: {
            stdio: 'inherit',
            shell: true
        },
        other: {
            // Any paths that you want to store. Some common defaults are conf and exe
            paths: {
                "conf": "",
                "exe": ""
            },
            // Any specific environment that needs to be stored
            env: "",
            // `setprocess` will set the config in the processes object in this `process` object
            setprocess: false,
            // Execute type --> exec ( exe > { executable, service } )
            // Execute type --> spawn ( exe > { file } )
            // Execute type --> fork ( exe > { file } )
            executetype: "exec",
            // `command` will be use to execute one of the above cmds action in the cmds key by default 
            //          when the execProcess {exec, spawn, fork, execFile} is run
            command: ""
        }
    };


    /**
     * 
     * setupHandler
     * 
     * 
     * @param {*} name 
     * Name of the configuration or default that needs to be handled
     * 
     * @param {String, Array, Object} optionsObject 
     * name == osList -> {String, Array} optionsObject 
     * name == processList -> {Array} optionsObject
     * name == processes -> {Object, Array} optionsObject
     * 
     * @return {Boolean}
     * Returns the boolean is the setupHandler set the value successfully
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
                        if (!!osList.valid(name)) {
                            osList.set(optionsObject[i]);
                        }
                    }
                    return true;
                } else if (typeof optionsObject === "string") {
                    if (!!osList.valid(name)) {
                        osList.set(optionsObject);
                    }
                    return true;
                }
                return false;
            case "processList":
                if (Array.isArray(optionsObject)) {
                    for (let i = 0; i < optionsObject.length; i++) {
                        if (!!processList.valid(optionsObject[i])) {
                            processList.set(optionsObject[i]);
                        }
                    }
                    return true;
                }
                return false;
            case "executableOptionList":
                if (Array.isArray(optionsObject)) {
                    for (let i = 0; i < optionsObject.length; i++) {
                        if (!!executableOptionList.valid(optionsObject[i])) {
                            executableOptionList.set(optionsObject[i]);
                        }
                    }
                    return true;
                }
                return false;
            case "processes":
                if (typeof optionsObject === "object") {
                    if (!optionsObject.name) {
                        return false;
                    }
                    return setter(processes, { [optionsObject.name]: optionsObject });
                } else if (Array.isArray(optionsObject)) {
                    let oKeys = Object.keys(optionsObject);
                    for (let i = 0; i < optionsObject.length; i++) {
                        if (!optionsObject[i].name) {
                            return false;
                        }
                        return setter(processes, { [optionsObject[oKeys[i]].name]: optionsObject[oKeys[i]] });
                    }
                }
                return false;
            default:
                return false;
        }
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
     * { name: String, type: String, os: String, exe: String, cmds: { commandOject }, process: Object, options { shellOptions }, other: { otherOptions }, [..keyargs..] }
     * 
     * - [..keyargs..]: Other custom keys for use with datahandler or cleanuphandler
     * 
     * - <commandObject>: { start: { subcommandObject }, stop: { subcommandObject }, restart: { subcommandObject }, generic: { subcommandObject } }
     * - <shellOptions>: { stdio: String, shell: Boolean }
     * - <otherOptions>: { paths: { conf: String, exe: String }, env: String, setprocess: Boolean, command: String }
     * - <subcommandObject>: { exe: [optional overide]String, usage: String, args: Array }
     * 
     * @returns {Boolean || Object} processes
     * 
     */
    function setProcess(processConf) {
        let setterVal = setter(processes, { [processConf.name]: processConf });
        if (!!setterVal) {
            processes = setterVal;
            return processes;
        }
        return false;
    }


    /**
     * 
     * exec
     * 
     * 
     * @param {String} exe
     * 
     * @param {Array Object} args
     * 
     * @param {Object} cmdOptions
     * 
     * @param {Function} dataHandler
     * 
     * @return {Object} exec result process object
     * Executed exec Command process result
     *
     */
    function exec(exe, args, cmdOptions, dataHandler) {
        let ex = require('child_process').exec;
        return ex([exe, ...args].join(" "), cmdOptions, function (error, stdout, stderr) {
            dataHandler(error, stdout, stderr);
        });
    }


    /**
     * 
     * execFile
     * 
     * 
     * @param {String} file
     * 
     * @param {Array Object} args
     * 
     * @param {Object} cmdOptions
     * 
     * @param {Function} dataHandler
     * 
     * 
     * @return {Object} execFile result process object
     * Executed execFile process result
     *
     */
    function execFile(file, args, cmdOptions, dataHandler) {
        let ex = require('child_process').execFile;
        return ex(file, [...args], cmdOptions, function (error, stdout, stderr) {
            dataHandler(error, stdout, stderr);
        });
    }


    /**
     * 
     * fork
     * 
     * 
     * @param {String} modulePath
     * 
     * @param {Array Object} args
     * 
     * @param {Object} cmdOptions
     * 
     * @param {Function} dataHandler
     * 
     * 
     * @return {Object}  fork result process object
     * Executed Forked fork process result
     *
     */
    function fork(modulePath, args, cmdOptions, dataHandler, handlers) {
        let ex = require('child_process').fork;
        return ex(modulePath, [...args], cmdOptions);
    }


    /**
     * 
     * spawn
     * 
     * 
     * @param {String} exe
     * 
     * @param {Array Object} args
     * 
     * @param {Object} cmdOptions
     * 
     * @param {Function} dataHandler
     * 
     * @return {Object} spawn result process object
     * Executed Spawned spawn process result
     *
     */
    function spawn(exe, args, cmdOptions, dataHandler, handlers) {
        let ex = require('child_process').spawn;
        let spw = ex(exe, [...args], cmdOptions);

        // Do not do a bind => emit an event (pref) or make this a promise
        // if (Object.keys(spw).indexOf("stdout") >= 0) {
        //     spw.stdout.on('data', function (data) {
        //         if (!!handlers.onDataHandler) {
        //             stdout = handlers.onDataHandler(null, data, null);
        //         }
        //     }.bind(null, stdout));
        // }

        // if (Object.keys(spw).indexOf("stdout") >= 0) {
        //     spw.stderr.on('data', function (data) {
        //         if (!!handlers.onDataHandler) {
        //             stderr = handlers.onDataHandler(null, null, data);
        //         }
        //     }.bind(null, stderr));
        // }

        // if (spw.keys().includes("stdin")) {
        //     spw.stdin.on('data', function (data) {
        //         if (!!handlers.onDataHandler) {
        //             stdin = handlers.onDataHandler(null, null, data);
        //         }
        //     }.bind(null, stdin));
        // }
        let datah, err, closer;
        spw.on('data', function (data) {
            console.log('Data Event to start subprocess.');
            datah = dataHandler(null, data, null);
        }.bind(null, datah));
        spw.on('error', function (err) {
            console.error('Failed to start subprocess.');
            err = dataHandler(err, null, null);
        }.bind(null, err));
        spw.on('close', function (code) {
            console.log(`Child process exited with code ${code}`);
            handlers(null, code);
        });
        return spw;
    }


    /**
     * 
     * registerEventHandlers
     * 
     * 
     * @param {Object} proc
     * 
     * @param {Object} eventHandlers
     * 
     * { event : { data: dataObject, handler: eventHandlerFunction } }
     * 
     */
    function registerEventHandlers(processConf, eventHandlers) {
        let eKeys, eKeysLen;
        if (Array.isArray(eventHandlers)) {
            eKeys = eventHandlers;
            eKeysLen = eKeys.length;
        } else if (typeof eventHandlers === "function") {
            eKeys = eventHandlers.keys();
            eKeysLen = eKeys.length;
        }

        function cleanup(eventType, exitFunction, processConf) {
            console.log('registerEventHandlers: Cleanup Fnc EventType and Process PID: ', eventType, processConf["process"].pid);
            exitFunction(eventType, processConf);
        }

        for (let e = 0; e < eKeysLen; e++) {
            // let { data, handler } = eventHandlers[eKeys[e]];
            let handler = eventHandlers[eKeys[e]];
            processConf["process"].on(eKeys[e], cleanup.bind(null, eKeys[e], handler, processConf));
        }

        return processConf;
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
     * @param {Function} dataHandler
     * 
     * @param {Function} cleanupHandler
     * 
     * @param {Object} handlers
     * { signal : Function, ... }
     * 
     * @returns {Object} processConf
     * 
     * { name: String, type: String, os: String, exe: String, cmds: { commandOject }, process: Object, options { shellOptions }, other: { otherOptions }, [... keyargs ...] }
     * 
     * - [... keyargs ...]: Other custom keys (key-value) for use with your datahandler or cleanuphandler provided
     * 
     * - <commandObject>: { start: { subcommandObject }, stop: { subcommandObject }, restart: { subcommandObject }, generic: { subcommandObject } }
     * - <shellOptions>: { stdio: String, shell: Boolean }
     * - <otherOptions>: { paths: { conf: String, exe: String }, env: String, setprocess: Boolean, executetype: String, command: String }
     * - <subcommandObject> [optionals: exe, modulePath, file]: { exe: String, modulePath: String, file: String, usage: String, args: Array }
     * 
     */
    function executeProcess(processConf, dataHandler, cleanupHandler, handlers = {}) {
        // {name: {commands, instances: {pid: instance}}}
        let proc, usage, args;
        let stdout, stderr, err, closeresult;

        // Signal Numbers - http://people.cs.pitt.edu/~alanjawi/cs449/code/shell/UnixSignals.htm
        let evt = [`exit`, `SIGHUP`, `SIGQUIT`, `SIGKILL`, `SIGINT`, `SIGTERM`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`];
        let evtLen = evt.length;

        let { name, exe, cmds, os, type, options, other } = processConf;

        if (!!executableOptionList.valid(type)) {
            utils.error("startProcess: Server Definition or Process Definition does not include type");
        }

        let executetype = "exec";
        if (!!other["executetype"]) {
            executetype = other["executetype"];
        }

        let executable = path.join(!!other.osPaths["exe"] ? other.osPaths.exe : "", exe);
        
        if (!!other.command) {
            if (!cmds[other.command]) {
                utils.error("startProcess: Server Definition or Process Definition not allowed");
            } else {
                usage = cmds[other.command]["usage"];
                args = cmds[other.command]["args"];
                if (!!cmds[other.command]["exe"]) {
                    executable = path.join(other.osPaths.exe, cmds[other.command]["exe"]);
                }
            }
        } else if (!other.command) {
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
            let dataHandler = function (error, stdout, stderr) { };
        }

        if (!cleanupHandler && (typeof cleanupHandler === "function" || cleanupHandler instanceof Function || Object.prototype.toString().call(cleanupHandler) == "[object Function]")) {
            let cleanupHandler = function (options, prc) { };
        }

        if (executetype === "exec") {
            proc = exec(executable, [usage, ...args], options, dataHandler);
        } else if (executetype === "execFile") {
            proc = execFile(executable, [usage, ...args], options, dataHandler);
        } else if (executetype === "spawn") {
            proc = spawn(executable, [usage, ...args], options, dataHandler, handlers);
        } else if (executetype === "fork") {
            proc = fork(executable, [usage, ...args], options, dataHandler, handlers);
        }

        processConf["pid"] = proc.pid;
        processConf["process"] = proc;

        proc.on("error", function (data) {
            if (!!handlers.onErrorHandler) {
                err = onErrorHandler(data, null, null);
            }
        }.bind(null, err));
        proc.on("data", dataHandler);
        proc.on("close", function (code) {
            if (!!handlers.closeHandler) {
                closeresult = closeHandler(code);
            }
        }.bind(null, closeresult));

        process.stdin.resume();
        // proc.unref();

        function cleanupSrv(eventType, exitFunction, processConf) {
            console.log('startProcess: Cleanup Function, EventType, and Process PID: ', eventType, processConf["pid"].pid);
            exitFunction(eventType, processConf);
        }

        for (let i = 0; i < evtLen; i++) {
            console.log("Event Logging: ", evt[i]);
            proc.on(evt[i], cleanupSrv.bind(null, evt[i], cleanupHandler, processConf));
        }

        if (!!other.setprocess) {
            let setprc = setProcess(processConf);
            if (!!setprc) { /* Do something here - callback */ }
        }

        return processConf;
    }


    /**
     *
     * executeAction
     *
     * @param {String} name 
     * 
     * @param {String} action
     * One of many actions in `cmds` key of `processConf`
     * 
     * @param {Function} dataHandler
     * 
     * @param {Function} cleanupHandler
     * 
     * @return {Object} processConf
     * 
     */
    function executeAction(name, action, dataHandler, cleanupHandler) {
        let prconf = getProcess(name);
        if (typeof action !== "string" || !prconf) {
            return false;
        }
        if (!!prconf.cmds[action]) {
            prconf.other["command"] = action;
            prconf.other["setprocess"] = true;
        }
        let cf = executeProcess(prconf, dataHandler, cleanupHandler);
        if (!!cf) {
            return cf;
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
     * @param {Function} dataHandler
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
     * @param {Function} dataHandler
     * 
     * @param {Function} cleanupHandler
     * 
     * @returns {Object}
     * { name: String, type: String, os: String, exe: String, cmds: { commandOject }, process: Object, options { shellOptions }, other: { otherOptions }, [... keyargs ...] }
     * 
     * - [... keyargs ...]: Other custom keys for use with datahandler or cleanuphandler
     * 
     * - <commandObject>: { start: { subcommandObject }, stop: { subcommandObject }, restart: { subcommandObject }, generic: { subcommandObject } }
     * - <shellOptions>: { stdio: String, shell: Boolean }
     * - <otherOptions>: { paths: { conf: String, exe: String }, env: String, setprocess: Boolean, executetype: String, command: String }
     * - <subcommandObject> [optionals: exe, modulePath, file]: { exe: String, modulePath: String, file: String, usage: String, args: Array }
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
     * @returns {Boolean, Object} result process object
     * false / Process Instance
     * 
     */
    function execProcessAsync(conf, dataHandler) {
        return new Promise(function (resolve, reject) {

        });
    }


    /**
     *
     * fetchRunningProcess
     *
     * @param {String} os
     * OS of the system
     * @param {Object} cmdOptions
     * Options for the command process function {exec} object
     * @param {Function} dataHandler
     * Function object for callback
     * 
     * @returns {Object} result process object
     * 
     */
    function fetchRunningProcess(cmdOptions, dataHandler) {
        let cmdExec, cmdSpawn;
        let ostype = osList.get();
        if (!!osList.valid(ostype)) {
            utils.error("OS not in the list");
        }

        if (ostype === "android") {
            cmdExec = 'ps';
        } else if (ostype === "win32" || ostype === "Windows_NT") {
            // cmdSpawn = 'powershell.exe /c Get-CimInstance -className win32_process | select Name,ProcessId,ParentProcessId,CommandLine,ExecutablePath';
            cmdSpawn = 'wmic process';
        } else {
            // cmdExec = `ps -p ${condition.pid} -ww -o pid,ppid,uid,gid,args`;
            // cmdExec = 'ps ax -ww -o pid,ppid,uid,gid,args';
            cmdExec = `ps ax -ww -o euser,ruser,suser,fuser,f,fgroup,pid,ppid,uid,gid,lstart,etime,args,comm,%mem,%cpu`;
        }

        if (!cmdExec && !cmdSpawn) {
            return false;
        }

        return exec(!!cmdExec ? cmdExec : cmdSpawn, [], cmdOptions, dataHandler);
    }


    /**
     *
     * findRunningProcess
     *
     * @param {String} os
     * OS of the system
     * @param {Object} cmdOptions
     * Options for the command process function {exec} object
     * @param {Function} dataHandler
     * Function object for callback
     * @param {Object} conditions
     * Conditions that needs to be used to find processes
     * 
     * // Available Find Options
     * // Windows: Name, ProcessId, ParentProcessId, CommandLine, ExecutablePath
     * // Linux, Mac, Android: pid, ppid (parent processid), command(cmdline - command), bin(binpath - command), executable (executable - command)
     * 
     * @return {Object} result process object
     * 
     */
    function findRunningProcess(cmdOptions, dataHandler, conditions) {
        let processes = fetchRunningProcess(cmdOptions, dataHandler), result;
        let ostype = osList.get();
        let pid, ppid, executable, bin, command;

        // Available Find Options
        // Windows: Name, ProcessId, ParentProcessId, CommandLine, ExecutablePath
        // Linux, Mac, Android: pid, ppid (parent processid), command(cmdline - command), bin(binpath - command), executable (executable - command)

        if (ostype == "win32" || ostype === "Windows_NT") {
            pid = "ProcessID"
            ppid = "ParentProcessId"
            executable = "Name"
            bin = "ExecutablePath"
            command = "CommandLine"
        } else {
            pid = "pid"
            ppid = "ppid"
            bin = executable = command = "COMMAND"
        }

        if (!!conditions[pid]) {
            result = [...processes.filter(function (item) {
                if (item[pid] === conditions[pid]) {
                    return item;
                }
            })]
        }

        if (!!conditions[ppid]) {
            result = [...result, ...processes.filter(function (item) {
                if (item[ppid] === conditions[ppid]) {
                    return item;
                }
            })]
        }

        if (!!conditions[executable]) {
            result = [...result, ...processes.filter(function (item) {
                if (item[executable].includes(conditions[executable].name)) {
                    return item;
                }
            })]
        }

        if (!!conditions[bin]) {
            result = [...result, ...processes.filter(function (item) {
                if (item[bin].includes(conditions[bin].path)) {
                    return item;
                }
            })]
        }

        if (!!conditions[command]) {
            result = [...result, ...processes.filter(function (item) {
                if (item[command].includes(conditions[command])) {
                    return item;
                }
            })]
        }

        return result;
    }


    /**
     * Kill function fir Generic Process
     *
     * @param {*} pid
     * @param {*} signal
     * 
     */
    function kill(pid, signal) {
        let ostype = osList.get();
        if (ostype != "win32" && ostype != "Windows_NT") {
            process.kill(pid, signal);
            return true;
        } else {
            return spawn("Taskkill /F /PID " + pid + " & exit/b & timeout /t 30", [], {
                stdio: 'inherit',
                shell: true
            }, (error, stdout, stderr) => {
                console.log("error, stdout, stderr: ", stdout, stderr, error)
                return true;
            }, (data, code) => {
                console.log("data, code: ", data, code)
                return true;
            });
        }
    }


    /**
     * 
     * killProcess fir saved instance
     * 
     * 
     * @param {String} name
     * 
     * @returns {Boolean}
     * 
     */
    function killProcess(name, signal) {
        try {
            let procConf = getProcess(name);
            if (!procConf) {
                error("killProcess: Failed Killing/Stopping process " + name + ". No such Process stored in Instance")
            }
            let proc = procConf['process'];
            let setterVal = null;
            if (!!proc) {
                proc.kill(signal);
                proc.stdin.end();
                procConf['process'] = null;
            }
            setterVal = setter(processes, { [name]: procConf });
            if (!setterVal) {
                console.error("killProcess: Error during setting object to null");
            }
            console.log('killProcess: Killed/Stopped process ' + name, "Object is ", processes[name]);
            return true;
        } catch (e) {
            return false;
        }
    }


    return {
        setup: setupHandler,
        process: {
            set: setProcess,
            get: getProcess,
            registerHandlers: registerEventHandlers,
            exec: exec,
            execFile: execFile,
            fork: fork,
            spawn: spawn,
            executeProcess: executeProcess,
            executeAction: executeAction,
            fetchRunning: fetchRunningProcess,
            find: findRunningProcess,
            killProcess: killProcess,
            kill: kill
        }
    }
}

module.exports = handler;
