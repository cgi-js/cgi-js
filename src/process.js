/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/

/* eslint no-console: 0 */
const process = require('process');
const path = require("path");
const utils = require("./utils")();
const setter = utils.setter, getter = utils.getter, error = utils.error, osList = utils.os, processList = utils.processes, executableOptionList = utils.executableOptions;

/** @typedef { { name: String, exe: String, cmds: { generic: { exe: String, modulePath: String, file: String, usage: String, args: Array } }, process: Object, options: { stdio: String, shell: Boolean }, other: { paths: { conf: String, exe: String }, env: String, setprocess: Boolean, executetype: String, command: String  }, [keywordargs: string]: (data: any) => any } } ProcessConf  */

/**
 * 
 * handler
 * Process Execution and Management handler
 * 
 * 
 * @returns { ProcessObject<{
 *              setup: setupHandler, 
 *              process: { 
 *                  set: setProcess, get: getProcess, registerHandlers: registerEventHandlers, 
 *                  exec: exec, execFile: execFile, fork: fork, spawn: spawn, 
 *                  executeProcess: executeProcess, executeAction: executeAction, 
 *                  fetchRunning: fetchRunningProcess, find: findRunningProcess, 
 *                  killProcess: killProcess, kill: kill 
 *              }
 *          }> }
 * 
 * Contains Process module functions
 * 
 * Process Module Object => { ProcessObject }
 * 
 * 
 */
function handler() {
    let processes = {};

    // let osList = ["win32", "win64", "Windows_NT", "darwin", "unix", "linux", "fedora", "debian"];
    // let executableOptions = ["executable", "service", "file"];
    // let processList = ["httpd", "tomcat", "mongoose", "putty", "nginx", "mysql", "pgsql", "top", "mysql", "mongodb", "pgsql"];

    let commandObject = require("./configs").process;

    /**
     * 
     * setupHandler
     * 
     * 
     * @param { String } [name] 
     * Name of the configuration or default that needs to be handled
     * 
     * @param { String | Array | Object } [optionsObject] 
     * 
     * (name == osList) >>> {String, Array} optionsObject 
     * 
     * (name == processList) >>> {Array} optionsObject
     * 
     * (name == processes) >>> {Object, Array} optionsObject
     * 
     * 
     * @return { Boolean } ?isSetup
     * 
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
     * @param { String | Array } [processNames]
     *      processNames is single or Array of ids
     * 
     * @returns { Boolean | Object } processes
     * 
     * processes: processes list object
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
     * @param { Object } [processConf]
     *      
     * { name: String, exe: String, cmds: { commandOject }, process: Object, options { shellOptions }, other: { otherOptions }, [..keyargs..] }
     * 
     * - [..keyargs..]: Other custom keys for use with datahandler or cleanuphandler
     * 
     * - <commandObject>: { start: { subcommandObject }, stop: { subcommandObject }, restart: { subcommandObject }, generic: { subcommandObject } }
     * - <shellOptions>: { stdio: String, shell: Boolean }
     * - <otherOptions>: { paths: { conf: String, exe: String }, env: String, setprocess: Boolean, command: String }
     * - <subcommandObject>: { exe: [optional overide]String, usage: String, args: Array }
     * 
     * @returns { Boolean | Object } processes
     * 
     * processes: processes list object
     * 
     */
    function setProcess(processConf) {
        processes = setter(processes, { [processConf.name]: processConf });
        return processes;
    }


    /**
     * 
     * exec
     * 
     * 
     * @param { String } [exe]
     * 
     * @param { Array } [args]
     * 
     * @param { Object } [cmdOptions]
     * 
     * @param { DataHandler<{ (error, stdout, stderr) => any }> } [dataHandler]
     * 
     * @return { Object } exec process object
     * 
     * Executed exec Command process as result
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
     * @param { String } [file]
     * 
     * @param { Array } [args]
     * 
     * @param { Object } [cmdOptions]
     * 
     * @param { DataHandler<{ (error, stdout, stderr) => any }> } [dataHandler]
     * 
     * @return { Object } execFile process object
     * 
     * Executed execFile process as result
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
     * @param { String } [modulePath]
     * 
     * @param { Array } [args]
     * 
     * @param { Object } [cmdOptions]
     * 
     * @param { DataHandler<{ (error, stdout, stderr) => any }> } [dataHandler]
     * 
     * @param { Handlers<{ (data) => any }> } [handlers]
     * 
     * @return { Object }  forked process object
     * 
     * Executed Forked fork process as result
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
     * @param { String } [exe]
     * exe will the node js file to spawn
     * 
     * @param { Array } [args]
     * 
     * @param { Object } [cmdOptions]
     * 
     * @param { DataHandler<{ (error, stdout, stderr) => any }> } [dataHandler]
     * 
     * @param { Handlers<{ (data) => any }> } [handlers]
     * 
     * @return { Object } spawned process object
     * 
     * Executed Spawned spawn process as result
     *
     */
    function spawn(exe, args, cmdOptions, dataHandler, handlers) {
        let ex = require('child_process').spawn;
        let spw = ex(exe, [...args], cmdOptions);

        let datah, datar, err, closer;

        spw.on('data', function (data) {
            // console.log('Data Event to start subprocess.');
            datah = dataHandler(null, data, null);
        }.bind(null, datah));
        spw.on('error', function (err) {
            console.error('Failed to start subprocess.');
            err = dataHandler(err, null, null);
        }.bind(null, err));
        spw.on('close', function (code) {
            // console.log(`Child process exited with code ${code}`);
            if (typeof handlers !== "function") {
                handlers = (a, c) => { /* console.log(a, c); */ }
            }
            handlers(null, code);
        });
        return spw;
    }


    /**
     * 
     * registerEventHandlers
     * 
     * 
     * @param { Object } [proc]
     * 
     * @param { { [eventname:string]: (data: any) => any } } [eventHandlers]
     * 
     * { event : { data: dataObject, handler: eventHandlerFunction } }
     * 
     * @returns { Object } processConf
     * 
     */
    function registerEventHandlers(processConf, eventHandlers) {
        let eKeys, eKeysLen;
        if (Array.isArray(eventHandlers)) {
            eKeys = eventHandlers;
            eKeysLen = eKeys.length;
        } else if (typeof eventHandlers === "object") {
            eKeys = Object.keys(eventHandlers);
            eKeysLen = eKeys.length;
        }

        /**
         *
         *
         * @param {*} eventType
         * 
         * @param {*} exitFunction
         * 
         * @param {*} processConf
         * 
         * @return { undefined } 
         * 
         */
        function cleanup(eventType, exitFunction, processConf) {
            console.log('registerEventHandlers: Cleanup Fnc EventType and Process PID: ', eventType, processConf["process"].pid);
            exitFunction(eventType, processConf);
        }

        for (let e = 0; e < eKeysLen; e++) {
            let handler = (typeof eventHandlers === "object") ? eventHandlers[eKeys[e]] : (arguments) => { };
            processConf["process"].on(eKeys[e], cleanup.bind(null, eKeys[e], handler, processConf));
        }

        return processConf;
    }


    /**
     * 
     * executeProcess
     * 
     *
     * @param { ProcessConf } [processConf]
     * Defines the process Object needed to start the process
     * Expected Structure: {  }
     * 
     * process/server/database = 
     *  
     * @param { DataHandler<{ (error, stdout, stderr) => any }> } [dataHandler]
     * 
     * @param { CleanupHandler<{ (options, prc) => any }> } [cleanupHandler]
     * 
     * @param { { [eventname:string]: (data: any) => any } } [handlers]
     * { signal : Function, ... }
     * 
     * @returns { ProcessConf<{ 
     *          name: String, 
     *          exe: String, 
     *          cmds: { generic: { exe: String, modulePath: String, file: String, usage: String, args: Array } }, 
     *          process: Object, 
     *          options: { stdio: String, shell: Boolean }, 
     *          other: { 
     *              paths: { conf: String, exe: String }, 
     *              env: String, setprocess: Boolean, 
     *              executetype: String, command: String 
     *          }, 
     *          [keywordargs: string]: (data: any) => any
     *      }> } [processConf]
     * 
     * { name: String, exe: String, cmds: { commandOject }, process: Object, options { shellOptions }, other: { otherOptions }, [... keyargs ...] }
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

        const generalHandler = function (data, event) {
            console.log("Event:  ", event, " General Handler: ", data);
            return data;
        };

        // Signal Numbers - http://people.cs.pitt.edu/~alanjawi/cs449/code/shell/UnixSignals.htm
        let evt = [`close`, `end`, `exit`, `SIGHUP`, `SIGQUIT`, `SIGKILL`, `SIGINT`, `SIGTERM`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`];
        let evtLen = evt.length;

        let { name, exe, cmds, options, other } = processConf;

        let executetype = "exec";
        if (!!other["executetype"]) {
            executetype = other["executetype"];
        }

        // Default executable is conf.exe
        let executable = path.join(!!other.paths["exe"] ? other.paths.exe : "", exe);

        if (!!other.command) {
            if (!cmds[other.command]) {
                error("startProcess: Server Definition or Process Definition not allowed");
            } else {
                usage = cmds[other.command]["usage"];
                args = cmds[other.command]["args"];
                if (!!cmds[other.command]["exe"]) {
                    // If cmds[cmd].exe is present, it takes presidence
                    // If cmds[cmd].exe is not present, cmds[cmd].usage takes presidence
                    // If cmds[cmd].exe is not present, cmds[cmd].usage is not present, conf.exe takes presidence

                    // NEW
                    executable = path.join((!!other.paths["exe"]) ? other.paths.exe : "", cmds[other.command]["exe"] ? cmds[other.command]["exe"] : (!!cmds[other.command].usage) ? cmds[other.command].usage : (!!cmds.exe) ? cmds.exe : undefined);

                    // Deprecating Usage
                    // executable = path.join(!!other.paths["exe"] ? other.paths.exe : "", (!!cmds[other.command]["exe"]) ? cmds[other.command]["exe"] : (!!cmds[other.command]["usage"]) ? cmds[other.command]["usage"] : exe);
                    usage = "";
                } else {
                    // If cmds[cmd].exe is not present, cmds[cmd].usage takes presidence
                    // If cmds[cmd].exe is not present, cmds[cmd].usage is not present, conf.exe takes presidence

                    // NEW
                    executable = path.join((!!other.paths["exe"]) ? other.paths.exe : "", (!!cmds[other.command].usage) ? cmds[other.command].usage : (!!cmds.exe) ? cmds.exe : undefined);

                    // Deprecating Usage
                    // executable = path.join(!!other.paths["exe"] ? other.paths.exe : "", (!!cmds[other.command]["usage"]) ? cmds[other.command]["usage"] : exe);
                    usage = "";
                }
            }
        } else if (!other.command) {
            error("startProcess: Server Definition or Process Definition does not have command to execute");
        }

        if (!usage) {
            usage = "";
        }

        if (!args) {
            args = [];
        } else if (!!args && !Array.isArray(args)) {
            error("startProcess: Arguments passed is incorrect");
        }

        // (Object.prototype.toString().call(dataHandler) != "[object Function]")
        if (!dataHandler || (typeof dataHandler !== "function" || !(dataHandler instanceof Function))) {
            dataHandler = function (error, stdout, stderr) { };
        }

        // (Object.prototype.toString().call(cleanupHandler) != "[object Function]")
        if (!cleanupHandler || ((typeof cleanupHandler !== "function") || !(cleanupHandler instanceof Function))) {
            cleanupHandler = function (options, prc) { };
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

        // proc.on("error", function (data) {
        //     if (!!handlers.onErrorHandler) {
        //         err = handlers.onErrorHandler(data, "error");
        //     } else {
        //         err = generalHandler(data, "error");
        //     }
        // }.bind(null, err));

        proc.on("data", dataHandler);

        process.stdin.resume();
        // proc.unref();

        function cleanupSrv(eventType, exitFunction, processConf) {
            // console.log('startProcess: Cleanup Function, EventType, and Process PID: ', eventType, processConf.pid);
            exitFunction(eventType, processConf);
        }

        for (let i = 0; i < evtLen; i++) {
            // console.log("Event Logging: ", evt[i]);
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
     * @param { String } name 
     * 
     * @param { String } action
     * One of many actions in `cmds` key of `processConf`
     * 
     * @param { DataHandler<{ (error, stdout, stderr) => any }> } [dataHandler]
     * 
     * @param { CleanupHandler<{ (options, prc) => any }> } [cleanupHandler]
     * 
     * @return { Boolean | ProcessConf } processConf
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
        return (!!cf) ? cf : false;
    }


    /**
     * 
     * execCommandAsync
     * 
     * 
     * @param { String } exe
     * 
     * @param { Array } args
     * 
     * @param { Object } cmdOptions
     * 
     * @param { DataHandler<{ (error, stdout, stderr) => any }> } [dataHandler]
     * 
     * @returns { Promise<Object> }
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
     * @param { Object } [processConf]
     * Defines the process Object needed to start the process
     * Expected Structure: {  }
     * 
     * process/server/database = 
     * 
     * @param { String } [file]
     *  
     * @param { DataHandler<{ (error, stdout, stderr) => any }> } [dataHandler]
     * 
     * @param { CleanupHandler<{ (options, prc) => any }> } [cleanupHandler]
     * 
     * @returns { Boolean | Object }
     * { name: String, exe: String, cmds: { commandOject }, process: Object, options { shellOptions }, other: { otherOptions }, [... keyargs ...] }
     * 
     * - [... keyargs ...]: Other custom keys for use with datahandler or cleanuphandler
     * 
     * - <commandObject>: { start: { subcommandObject }, stop: { subcommandObject }, restart: { subcommandObject }, generic: { subcommandObject } }
     * - <shellOptions>: { stdio: String, shell: Boolean }
     * - <otherOptions>: { paths: { conf: String, exe: String }, env: String, setprocess: Boolean, executetype: String, command: String }
     * - <subcommandObject> [optionals: exe, modulePath, file]: { exe: String, modulePath: String, file: String, usage: String, args: Array }
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
     * @param { Object } [conf]
     * 
     * @param { DataHandler<{ (error, stdout, stderr) => any }> } [dataHandler]
     *  
     * @returns { Promise<Object> } process object
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
     * @param { Object } [cmdOptions]
     * Options for the command process function {exec} object
     * 
     * @param { DataHandler<{ (error, stdout, stderr) => any }> } [dataHandler]
     * Function object for callback
     * 
     * @returns { Object } process object
     * Process Object returned as result
     * 
     */
    function fetchRunningProcess(cmdOptions, dataHandler) {
        let cmdExec, cmdSpawn;
        let ostype = osList.get();
        if (!osList.valid(ostype)) {
            error("OS not in the list");
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
     * @param { Object } [cmdOptions]
     * Options for the command process function {exec} object
     * 
     * @param { DataHandler<{ (error, stdout, stderr) => any }> } [dataHandler]
     * Function object for callback
     * 
     * @param { Object } [conditions]
     * Conditions that needs to be used to find processes
     * 
     * // Available Find Options
     * // Windows: Name, ProcessId, ParentProcessId, CommandLine, ExecutablePath
     * // Linux, Mac, Android: pid, ppid (parent processid), command(cmdline - command), bin(binpath - command), executable (executable - command)
     * 
     * @return { Object } processes array object
     * Process Object returned as result array
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
                if (item[executable].includes(conditions[executable])) {
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
     * @param { Number } [pid]
     * 
     * @param { * | Number | String } [signal]
     * 
     * @returns { Boolean }
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
     * @param { String } [name]
     * 
     * @param { * | Number | String } [signal]
     * 
     * @returns { Boolean | Error }
     * Boolean or Error object is returned
     * 
     */
    function killProcess(name, signal) {
        try {
            let procConf = getProcess(name);
            if (!procConf) {
                return error("killProcess: Failed Killing/Stopping process " + name + ". No such Process stored in Instance")
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
                return error("killProcess: Error during setting object to null");
            }
            console.log('killProcess: Killed/Stopped process ' + name, "Object is ", processes[name]);
            return true;
        } catch (e) {
            return error("killProcess: error during execution ", e.toString());
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
