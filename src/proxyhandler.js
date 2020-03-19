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


/**
 *
 *
 * @returns
 */
function handler() {

    var config = {};
    var conn, proc;

    /**
     *
     *
     * @param {*} cmd
     * @param {*} args
     * @param {*} options
     * @param {*} file
     * @returns
     */
    function startProcess(cmd, args, options, file) {
        options["stdio"] = 'inherit'
        var pSpawn = require('child_process').spawn;
        var proc = pSpawn(cmd, [args], options);

        // console.log(proc.pid);

        // // CLEAN UP ON PROCESS EXIT
        proc.stdin.resume();
        [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
            proc.on(eventType, cleanUpServer.bind(null, eventType));
        })

        return proc
    }

    /**
     *
     *
     * @param {*} proc
     */
    function stopProcess(proc) {
        proc.kill();
        proc.stdin.end();
    }

    /**
     *
     *
     * @param {*} conn
     * @param {*} options
     */
    function startProxy(conn, options) {

    }

    /**
     *
     *
     * @param {*} conn
     * @param {*} proc
     */
    function stopProxy(conn, proc) {

    }

    /**
     *
     *
     * @param {*} conn
     * @param {*} proc
     * @returns
     */
    function connectProxy(conn, proc) {
        return conn
    }

    /**
     *
     *
     * @param {*} conn
     */
    function closeProxy(conn) {
        conn.close()
    }
    
    /**
     *
     *
     * @param {*} options
     */
    function setConfig(options) {

    }

    return {
        proc: proc,
        conn: conn,
        config: config,
        setConfig: setConfig,
        start: startProxy,
        stop: stopProxy,
        connect: connectProxy,
        closeConn: closeProxy,
    }
}

module.exports = handler
