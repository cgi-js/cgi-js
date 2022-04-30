/**
 * 
 * Basic Nodejs Server
 * 
*/
'use strict';

module.exports = function (config) {
    let app = require("express")();
    app.get('*', (req, res) => {
        res.send('Simple Expressjs Web server! started at path - ' + req.url.toString());
    });
    app.listen(config.port, () => {
        console.log(`Starting Simple Expressjs Web server! at port ${config.port}`)
    });
    return app;
}
