
var obj = require("../../../src/process")();
const cgijs = require("../../../src");
var events = require('events');
var eventEmitter = new events.EventEmitter();
var myEventHandler = function (prc) {
    setTimeout(function() {
        console.log("Closing Process PID: ", prc.pid);
        // console.log("Process Object: ", prc);
        if (obj.process.kill(prc.pid, 1)) {
            prc = null;
        }
        console.log("Closing Node Process: ", process.pid);
        process.exit();
    }.bind(prc, obj), 10000);
}
eventEmitter.on('closeprocess', myEventHandler.bind(obj));



// Convert/Write tests for the following code

var proc = obj.process.start(
    {
        exe: "python",
        args: [],
        options: {
            stdio: 'inherit',
            shell: true
        },
        other: {
            osPaths: {
                conf: "",
                exe: ""
            },
            command: "",
            serverType: "",
            type: type,
            exeOptions: exeOptions
        }
    },
    "./www/py/index.py",
    function (error, stdout, stderr) {
        console.log("CB: Callback function Invoking");
        console.log("CB: Stdout: ", stdout);
        console.log("CB: Stderr: ", stderr);
        console.log("CB: Error: ", error);

        function response(type, exeOptions) {
            var cgi = cgijs.init();
            return function (req, res, next) {
                let requestObject = {
                    url: URL.parse(req.originalUrl),
                    originalUrl: req.originalUrl,
                    query: req.url.query,
                    method: req.method,
                    body: req.body,
                    ip: req.ip,
                    headers: req.headers
                }
                cgi.serve(type, requestObject, exeOptions).then(function (result) {
                    result.statusCode = (!result.statusCode) ? 200 : result.statusCode;
                    res.status(result.statusCode).send(result.response);
                }.bind(res)).catch(function (e) {
                    e.statusCode = (!e.statusCode) ? 500 : e.statusCode;
                    res.status(e.statusCode).send(e.response);
                });
            }.bind(cgijs);
        }
        return response(type, exeOptions).bind(cgijs)
    }.bind(cgijs),
    (options, prc) => {
        console.log("Exit Handler options", options);
        console.log("Exit Handler process", prc.pid);
        eventEmitter.emit('closeprocess', prc);
    }
);



