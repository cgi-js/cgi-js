module.exports = {
    "proxy": {
        "options": {
            "target": {
                "protocol": "http:",
                "host": "127.0.0.1",
                "port": 9001,
                "pfx": null,
                "passphrase": ""
            },
            "ws": false,
            "secure": false,
            "xfwd": true,
            "toProxy": true,
            "prependPath": true,
            "ignorePath": false,
            "changeOrigin": false,
            "preserveHeaderKeyCase": true,
            "auth": ":",
            "hostRewrite": true,
            "protocolRewrite": null,
            "cookieDomainRewrite": false,
            "cookiePathRewrite": false,
            "headers": {},
            "proxyTimeout": 10000,
            "timeout": 10000,
            "selfHandleResponse": false,
            "buffer": null,
            "ssl": {
                "key": null,
                "cert": null
            }
        },
        "listenPort": 8001,
        "stream": false,
        "modify": false,
        "runtime": false
    },
    "process": {
        // name of the object that it should be stored or identifies as 
        "name": "",
        // // // Removing and deprecating type and os in favour of generic implementation
        // // // os and type may be replaced in favour of cmds key name (cmds[cmdsnamewithOSandTYPE])
        // // // Add as many variations / patterns needed in the cmds[key] naming
        // 
        // // type --> One of the executableOptions options
        "type": "executable",
        // // os for which this configuration is about
        // // .platform: win32, linux, darwin
        // // .type/ .getOS: Windows_NT, Linux, Darwin
        "os": "",
        // exe --> any executable or systemctl
        "exe": "",
        // cmds will have list of actions/ prestored commands that may be needed for executing the process
        // cmds action execution will be controlled by and 
        //        depend on whether `other.command` key is specified during execution
        // cmds: { usage, exe, args, os }
        "cmds": {
            "start": { "usage": "start", "args": [] },
            "stop": { "usage": "stop", "args": [] },
            "restart": { "usage": "restart", "args": [] },
            // exe is optional and can be used if you want to override 
            //      the commandObject[exe] value for a specific command in commandObject[exe][cmds]
            "generic": { "exe": "", "usage": "", "args": [] },
            "startbatwin32": { "exe": "", "usage": "", "args": [] },
            "stopbatwin32": { "exe": "", "usage": "", "args": [] },
            "startbatWindows_NT": { "exe": "", "usage": "", "args": [] },
            "stopbatWindows_NT": { "exe": "", "usage": "", "args": [] },
            "startbatlinux": { "exe": "", "usage": "", "args": [] },
            "stopbatlinux": { "exe": "", "usage": "", "args": [] },
            "startbatmac": { "exe": "", "usage": "", "args": [] },
            "stopbatmac": { "exe": "", "usage": "", "args": [] }
        },
        // shell options for nodejs process `exec` function definition
        //      Will be passed as an arg for `process.exec` function inside implementation under the hood
        //      Defaults to { stdio: 'inherit', shell: true }
        "options": {
            "stdio": 'inherit',
            "shell": true
        },
        "other": {
            // Any paths that you want to store. Some common defaults are conf and exe
            "paths": {
                "conf": "",
                "exe": ""
            },
            // Any specific environment that needs to be stored
            "env": "",
            // `setprocess` will set the config in the processes object in this `process` object
            "setprocess": false,
            // Execute type --> exec ( exe > { executable, service, executable file } )
            // Execute type --> execFile ( exe > { file } )
            // Execute type --> spawn ( exe > { file } )
            // Execute type --> fork ( exe > { file } )
            "executetype": "exec",
            // `command` will be use to execute one of the above cmds action in the cmds key by default 
            //          when the execProcess {exec, spawn, fork, execFile} is run
            "command": ""
        }
    }
}
