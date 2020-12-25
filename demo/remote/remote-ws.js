const express = require('express');

module.exports = (port) => {
    var remoteproxy = express();
    
    remoteproxy.listen(port);
    return remoteproxy;
};
