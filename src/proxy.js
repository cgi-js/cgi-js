// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

/* eslint no-console: 0 */

// command <string> The command to run.
// args <string[]> List of string arguments.

// options <Object>

//     cwd <string> Current working directory of the child process.
//     env <Object> Environment key-value pairs. Default: process.env.
//     argv0 <string> Explicitly set the value of argv[0] sent to the child process. This will be set to command if not specified.
//     stdio <Array> | <string> Child's stdio configuration (see options.stdio).
//     detached <boolean> Prepare child to run independently of its parent process. Specific behavior depends on the platform, see options.detached).
//     uid <number> Sets the user identity of the process (see setuid(2)).
//     gid <number> Sets the group identity of the process (see setgid(2)).
//     serialization <string> Specify the kind of serialization used for sending messages between processes. Possible values are 'json' and 'advanced'. See Advanced Serialization for more details. Default: 'json'.
//     shell <boolean> | <string> If true, runs command inside of a shell. Uses '/bin/sh' on Unix, and process.env.ComSpec on Windows. A different shell can be specified as a string. See Shell Requirements and Default Windows Shell. Default: false (no shell).
//     windowsVerbatimArguments <boolean> No quoting or escaping of arguments is done on Windows. Ignored on Unix. This is set to true automatically when shell is specified and is CMD. Default: false.
//     windowsHide <boolean> Hide the subprocess console window that would normally be created on Windows systems. Default: false.


// https://nodejs.org/api/child_process.html
// https://gist.github.com/ami-GS/9503132

// https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits


// Promising- Good
// https://www.npmjs.com/package/fast-proxy

// 
// https://www.npmjs.com/package/proxy-chain

// Promising - Good
// + fastify
// https://www.npmjs.com/package/fastify-vhost

// 
// https://www.npmjs.com/package/local-web-server
// https://www.npmjs.com/package/start-proxy-server
// https://www.npmjs.com/package/bfn-proxy

const https = require('https');
const request = require('request');

// List of common servers maintained per application instance
let servers = {}, serverPortRanges = ['8000-9000', '10000-15000'];
let serverCommands = {
    httpd: {
        cmd: 'apache2', args: {}, options: {}, other: {
            conf: '', starter: 'start', stopper: 'stop', restarter: 'restart', osPaths: {
                "win32": { conf: {}, exe: {} }, "Windows_NT": { conf: {}, exe: {} }, "darwin": { conf: {}, exe: {} },
                "fedora": { conf: {}, exe: {} }, "debian": { conf: {}, exe: {} }, "unix": { conf: {}, exe: {} }
            }
        }
    },
    tomcat: {
        cmd: '', args: {}, options: {}, other: {
            conf: '', starter: 'start', stopper: 'stop', restarter: 'restart', osPaths: {
                "win32": { conf: {}, exe: {} }, "win64": { conf: {}, exe: {} }, "darwin": { conf: {}, exe: {} },
                "fedora": { conf: {}, exe: {} }, "debian": { conf: {}, exe: {} }, "unix": { conf: {}, exe: {} }
            }
        }
    },
    mongoose: {
        cmd: 'mongoose', args: {}, options: {}, other: {
            conf: '', starter: 'start', stopper: 'stop', restarter: 'restart', osPaths: {
                "win32": { conf: {}, exe: {} }, "win64": { conf: {}, exe: {} }, "darwin": { conf: {}, exe: {} },
                "fedora": { conf: {}, exe: {} }, "debian": { conf: {}, exe: {} }, "unix": { conf: {}, exe: {} }
            }
        }
    },
    putty: {
        cmd: '', args: {}, options: {}, other: {
            conf: '', starter: 'start', stopper: 'stop', restarter: 'restart', osPaths: {
                "win32": { conf: {}, exe: {} }, "win64": { conf: {}, exe: {} }, "darwin": { conf: {}, exe: {} },
                "fedora": { conf: {}, exe: {} }, "debian": { conf: {}, exe: {} }, "unix": { conf: {}, exe: {} }
            }
        }
    },
    nginx: {
        cmd: 'nginx', args: {}, options: {}, other: {
            conf: '', starter: 'start', stopper: 'stop', restarter: 'restart', osPaths: {
                "win32": { conf: {}, exe: {} }, "win64": { conf: {}, exe: {} }, "darwin": { conf: {}, exe: {} },
                "fedora": { conf: {}, exe: {} }, "debian": { conf: {}, exe: {} }, "unix": { conf: {}, exe: {} }
            }
        }
    },
    commandObject: {
        cmd: '', args: {}, options: {}, other: {
            conf: '', starter: 'start', stopper: 'stop', restarter: 'restart', osPaths: {
                "win32": { conf: {}, exe: {} }, "win64": { conf: {}, exe: {} }, "darwin": { conf: {}, exe: {} },
                "fedora": { conf: {}, exe: {} }, "debian": { conf: {}, exe: {} }, "unix": { conf: {}, exe: {} }
            }
        }
    },
};


/**
 * 
 * handler
 * 
 * @returns
 */
function handler() {

    // List of Configurations (config)
    // List of Conections (connections)
    // List of Processes (processes)
    let config = {}, connections = {}, processes = {};

    // List of servers maintained per handler instance
    let instanceServers = {}, instancePortRanges = [];

    /**
     * 
     * setter
     *
     * @param {*} obj
     * 
     * @param {*} values
     * 
     * @returns
     * 
     */
    function setter(obj, values) {
        if (!!options) {
            keys = values.keys();
            for (let i = 0; i < keys.length; i++) {
                obj[keys[i]] = values[key[i]];
            }
        }
    }

    /**
     * 
     * getter
     *
     * @param {*} obj
     * 
     * @param {*} args
     * 
     * @returns
     * 
     */
    function getter(obj, args) {
        if (!!args) {
            if (typeof args === String) {
                return obj[args];
            } else if (typeof args === Array) {
                let tmp = {};
                for (let i = 0; i < args.length; i++) {
                    if (!!obj[args[i]]) {
                        tmp[args[i]] = obj[args[i]];
                    }
                }
                return tmp;
            }
        }
        return obj;
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
     * @returns undefined
     * 
     */
    function setConfig(options) {
        setter(config, options);
    }

    /**
     * 
     * getConn
     * Returns the connections requested
     * can be single key, or array of keys or complete connections object for fetch
     *
     * @param {undefined, String, Array} connNames
     * conns : single name of connection or array of connections to be fetched
     * 
     * @returns {*} connections
     * connections: connections object
     * 
     */
    function getConnection(connNames) {
        return getter(connections, connNames);
    }

    /**
     * 
     * setConn
     * Sets the connection of the connection key name provided
     * can be single or multiple keys or complete connection object for setting connections
     *
     * @param {undefined, Object} connObject
     * connObject is an object of connections with names of connection as keys
     * @returns undefined
     * 
     */
    function setConnection(connObject) {
        setter(connections, connObject);
    }

    /**
     * 
     * getProc
     * Returns the processes requested
     * can be single key, or array of keys or complete process object for fetch
     *
     * @param {undefined, String, Array} procIds
     * prcObject is single or Array of ids
     * @returns {*} processes
     * processes: processes list object
     * 
     */
    function getProcess(procIds) {
        return getter(processes, procIds);
    }

    /**
     * 
     * setProc
     * Sets the process of the connection key procId provided
     * can be single or multiple keys or complete process object for setting processes
     *
     * @param {undefined, object} procObj
     * 
     */
    function setProcess(procObj) {
        setter(processes, procObj);
    }

    /**
     * 
     * startProcess
     * 
     *
     * @param {*} procObject
     * Defines the process Object needed to start the process
     * Expected Structure: { exe, args, options, other }
     *      exe: executable for process, 
     *      args: arguments for process, 
     *      options: options for process,
     *      other: optional-more-for-server-processes
     * 
     * @param {*} file
     * 
     * @returns
     * 
     */
    function startProcess(procObject, file) {

        let procSpawn = require('child_process').spawn;
        let { exe, args, options, other } = procObject;
        // options["stdio"] = 'inherit';

        args.conf = !!other.osPaths.conf ?
            (other.osPaths.conf + args.conf) : args.conf;

        exe = other.osPaths.exe + exe;
        
        if (!!other.serverType && !!other.command && !!file) {
            error("Server definition or process definition allowed, not both");
        }
        
        let e = args.entries().flat(Infinity);
        if (!!other.command && !file) { e.push(other[other.command]); }
        if (!!file && !other.serverType) { e.push(file); }

        let prc = procSpawn(exe, [...e], options);
        // console.log(prc.pid);

        // CLEAN UP ON PROCESS EXIT
        process.stdin.resume();

        prc.on('data', function (data) {
            console.log(data);
        });

        function cleanUpServer(options, exitCode) {
            // TODO: Not getting triggered. Check error
            console.log("Event Type", eventType);
            if (options.cleanup) console.log('clean');
            if (exitCode || exitCode === 0) console.log(exitCode);
            if (options.exit) process.exit();
        }

        [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach(function (eventType) {
            prc.on(eventType, cleanUpServer.bind(null, eventType));
        }.bind(prc, cleanUpServer));

        processes[prc.pid] = prc;
        return { pid: prc.pid, srv: procObject };
    }

    /**
     * 
     * stopProcess
     *
     * @param {*} prc
     */
    function stopProcess(prc, signal) {
        // Ending the process through proc closure
        // Test the same
        // proc[prc].kill();
        process.kill(prc, signal);
        console.log('Killed process ' + processes[prc].pid);
        processes[prc] = null;
        process.stdin.end();
        return true;
    }

    /**
     * 
     * startProxy
     *
     * @param {*} conn
     * @param {*} options
     */
    function startProxy(conn, options) {

        const { proxy, close } = require('fast-proxy')({
            base: options.base_host + ":" + options.base_port
        });

        // try express instead of restana
        // app.all(path, callback [, callback ...])
        // app.all('*', loadUser)
        
        let express;
        if (!!options.https.key && options.https.cert) {
            express = require('express')({
                server: https.createServer({
                    key: options.https.key,
                    cert: options.https.cert
                })
            });
        } else {
            express = require('express')();
        }

        express.all(options.base_url, function (req, res) {
            proxy(req, res, req.url, {});
        });

        express.listen(options.proxy_port ? options.proxy_port : 0);

        return express;

    }

    /**
     * 
     * stopProxy
     *
     * @param {*} conn
     * @param {*} prxy
     */
    function stopProxy(gateway) {
        gateway.close().then(() => {
            return true;
        });
    }

    /**
     *
     * serve
     *
     * @param {*} handler
     * @param {*} options
     */
    function serveProxy(handler, options) {
        const { proxy_host, proxy_port, proxy_url, req, res, base_host, base_url, base_port } = options;
        request(proxy_host + ":" + proxy_port + proxy_url, function (error, response, body) {
            // console.error('error: ', error);
            // console.log('statusCode: ', response && response.statusCode);
            // console.log('body: ', body);
            if (!!error) { res.send(body.body) } else { res.status(body.statusCode).send(body.body) }
        }.bind(req, res));
    }

    /**
     *
     * setup
     *
     * @param {*} handler
     * @param {*} conf
     * @returns
     */
    function setupProxy(handler, conf, serve) {
        let { proxy_host, proxy_port, base_host, base_url, base_port } = conf;
        return function proxyHandler(req, res) {
            return serve(handler, {
                proxy_host: proxy_host,
                proxy_port: proxy_port,
                proxy_url: req.url,
                req: req,
                res: res,
                base_host: base_host,
                base_url: base_url,
                base_port: base_port
            });
        }
    }

    /**
     * 
     * startServer
     * 
     *
     * @param {*} srvObject
     * Expected Structure: { exe, args, options, other }
     *      exe: executable for process, 
     *      args: arguments for process, 
     *      options: options for process,
     *      useDefault: key provided if system defaults should be used and not to use embedded executable
     *      other: optional-more-for-server-processes
     *          Expected Structure: { serverType, host, port, command, conf, starter, stopper, restarter, osPaths: { conf, exe } }
     *          serverType: 
     *          host: 
     *          port: 
     *          command: 
     *          conf: 
     *          starter: 'start'
     *          stopper: 'stop'
     *          restarter: 'restart'
     *          osPaths: optional-more-for-server-processes
     *              Expected Structure: { conf: {}, exe: {} }
     *              conf:
     *              exe:
     * Example:
     * { exe, args, options, other: { serverType, host, port, command, conf, starter, stopper, restarter, osPaths: { conf, exe } } }
     * 
     * @returns
     * 
     */
    function startServer(srvObject) {
        let srv;
        if (srvObject.hasOwnProperty("useDefault") && srvObject.useDefault !== true) {
            srv = srvObject;
        } else {
            srv = serverCommands[srvObject.server];
            let keys = srvObject.keys();
            for (let i = 0; i < keys.length; i++) {
                srv = (!!serverCommands[keys[i]]) ? srvObject[keys[i]] : serverCommands[keys[i]];
            }
        }
        return startProcess(srv);
    }

    function stopServer(prc) {
        if (!!prc.other && !!prc.other.serverType) {
            prc = startProcess(prc.srv);
            if (!prc.pid) { return true; }
            return false;
        } else {
            if (!!stopProcess(prc.pid, 'EXIT')) { return true; }
            return false;
        }
    }

    return {
        setter: {
            config: setConfig,
            connection: setConnection,
            process: setProcess
        },
        getter: {
            config: getConfig,
            connection: getConnection,
            process: getProcess
        },
        process: {
            start: startProcess,
            stop: stopProcess
        },
        proxy: {
            start: startProxy,
            stop: stopProxy,
            serve: serveProxy,
            setup: setupProxy
        },
        server: {
            start: startServer,
            stop: stopServer
        }
    }
}

module.exports = handler;
