// var spawn = require('child_process').spawn;
// var grep  = spawn('grep', ['ssh']);

// console.log(grep.pid);
// grep.stdin.end();

// https://nodejs.org/api/child_process.html
// https://gist.github.com/ami-GS/9503132

// https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits

// // CLEAN UP ON PROCESS EXIT
// process.stdin.resume();
// [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
//     process.on(eventType, cleanUpServer.bind(null, eventType));
//   })


// var child = spawn('gulp', ['watch'], {
//     stdio: 'inherit',
// });
// child.kill();
// process.on('SIGTERM', function() {
//     console.log('Goodbye!');
// });



function handler(config) {

    var config = {};
    var conn;

    function startProcess() {

    }

    function stopProcess() {

    }

    function startProxy() {

    }

    function stopProxy() {

    }

    function connectProxy() {

    }

    function closeProxy() {

    }

    function setConfig() {

    }

    return {
        config: config,
        setConfig: setConfig,
        start: startProxy,
        stop: stopProxy,
        connect: connectProxy,
        closeConn: closeProxy,
    }
}

module.exports = handler
