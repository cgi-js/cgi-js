function socketclient(config) {
  const io = require("socket.io-client");
  const socket = io.connect('http://localhost:' + config.port.toString(), { reconnect: true });
  socket.on("message", function (msg) {

    let count = 0, message = "";
    console.log("Server message: ", msg);
    message += message.toString();

    count += 1
    if (count <= 10) {
      socket.emit("msg", "Hello from client");
    }

  });

  socket.on("error", function (error) {
    console.log("error", error.toString());
  });

}

socketclient({ port: 3000 });
