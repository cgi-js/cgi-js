"use strict";

function runweb(type, config) {
    let web = require("./web");
    let ws = require("./ws");
    let webws = require("./webws");
    let app;

    if (type === "web") {
        app = web(config);
    } else if (type === "ws") {
        app = ws(config);
    } else if (type === "webws") {
        app = webws(config);
    }
    
    return app;
}

// runweb("webws", { port: 3000 });
// runweb("ws", { port: 3000 });
runweb("web", { port: 3000 });

// module.exports = runweb;
