const express = require('express');

module.exports = (port) => {
    var remoteproxy = express();
    remoteproxy.use("/sub", function (req, res, next) { res.status(200).send("Path //sub"); });
    remoteproxy.use("/", function (req, res, next) { res.status(200).send("Path //"); });
    let srv = remoteproxy.listen(port);
    return { proxy: remoteproxy, server: srv };
};
