/**
 * 
 * Websocket Nodejs Server
 * 
*/
'use strict';

module.exports = function (config) {
    let app = require("express")();
    let http = require('http').Server(app);
    let io = require('socket.io')(http);

    io.on('connection', function (socket) {
        let count = 0;
        console.log('Server: User connected');
        socket.emit("message", "Hello from Server");
        socket.on('msg', function (msg) {
            count += 1
            if (count <= 10) {
                socket.emit("message", "Hello from Server");
            }
            console.log("Client: ", msg);
        });

    });

    http.listen(config.port, () => {
        console.log(`Starting Simple Expressjs Web server with websocket! at port ${config.port}`)
    });

    return app;
}
