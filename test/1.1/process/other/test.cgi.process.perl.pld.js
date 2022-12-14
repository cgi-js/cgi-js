
const obj = require("../../../../src/process")();
const cgijs = require("../../../../src");
const events = require('events');
const path = require("path");
const os = require("os");
const { assert } = require("console");
const { json } = require("express");
const eventEmitter = new events.EventEmitter();


var myEventHandler = function (prc) {
    setTimeout(function () {
        console.log("Closing Process PID: ", prc.pid);
        // console.log("Process Object: ", prc);
        if (obj.process.killProcess(prc.pid, 1)) {
            prc = null;
        }
        console.log("Closing Node Process: ", process.pid);
        process.exit();
    }.bind(prc, obj), 10000);
}
eventEmitter.on('closeprocess', myEventHandler.bind(obj));


if (__dirname.toString().includes("process")) {
    var args = [path.join(__dirname, "../../../../www/files/perl/index.pld")];
} else {
    var args = [path.join(__dirname, "./www/files/perl/index.pld")];
}

var proc = obj.process.executeProcess({
    name: "",
    // --> any executable or systemctl
    exe: "perl",
    cmds: {
        generic: { usage: "", args: args }
    },
    options: {
        stdio: 'inherit',
        shell: true
    },
    other: {
        paths: {
            "conf": "",
            "exe": "",
            "anyotherpaths": ""
        },
        env: "",
        command: "generic"
    }
},
    function (error, stdout, stderr) {
        console.log("CB: Callback function Invoking");
        console.log("CB: Stdout: ", stdout);
        console.log("CB: Stderr: ", stderr);
        console.log("CB: Error: ", error);

        console.log("Starting Tests");

        assert(os.platform() === "win32", "1. OS is Win32");
        if (os.platform() === "win32") {
            assert(!!stdout.toString().includes("This is a headline."), "2. Check STDOUT for perl (pld) server");
            assert(!!stdout.toString().includes("This is body text."), "2. Check STDOUT for perl (pld) server");
        } else {
            assert(false, "5. OS is not Win 32");
        }
        assert(!!stdout, "6. STDOUT has output");
        assert(!stderr, "7. STDERR is Falsy");
        
        console.log("Ending Tests");

    },
    function (eventType, prc) {
        console.log("Exit Handler options", eventType);
        console.log("Exit Handler process", prc.pid);
        eventEmitter.emit('closeprocess', prc);
    }
);

