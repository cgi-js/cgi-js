/*
License: MIT
Dynamic CGI process module based execution for 
        Interpreted Languages Eexecution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/

/* eslint no-console: 0 */
module.exports = {
    "name": "processthread",
    "type": "file",
    "os": "",
    "exe": "",
    "cmds": {
        "run": { "exe": "", "usage": "", "args": [] }
    },
    "options": {
        "stdio": "inherit",
        "shell": true
    },
    "other": {
        "paths": {
            "conf": "",
            "exe": ""
        },
        "env": "",
        "setprocess": true,
        "executetype": "exec",
        "command": "run"
    }
}
