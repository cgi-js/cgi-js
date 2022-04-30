/**
 * 
 * Basic and Websocket Nodejs Server
 * 
*/
'use strict';

module.exports = function (config) {
    const app = require('express')();
    const http = require('http').Server(app);
    const io = require('socket.io')(http);

    app.get('*', function (req, res) {
        res.sendfile('index.html');
    });

    //Whenever someone connects this gets executed
    io.on('connection', function (socket) {
        let count = 0;
        console.log('Server: User connected');
        socket.emit("message", "Hello from Server");

        // Message from client
        socket.on('msg', function (msg) {
            count += 1
            if (count <= 10) {
                socket.emit("message", "Hello from Server");
            }
            console.log("Client: ", msg);
        });

        //Whenever someone disconnects this piece of code executed
        socket.on('disconnect', function () {
            console.log('Server: User disconnected');
        });

    });

    http.listen(3000, function () {
        console.log('listening on *:3000');
    });

    return { http, app, io };
}
