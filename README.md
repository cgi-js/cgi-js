# cgi-js
Run any scripts that support cgi based serving


NodeCGIEmbedded - run scripts that support cgi using nodejs
-----------------------------------------------------------




Installation
------------

```
npm install cgijs --save
```

Usage
-----

To run php scripts with node js and express create the following script like below: 

```javascript

var express = require('express');
var cgijs = require("./src");
var cgi = cgijs.serve();

// var cgi = require("cgijs");
var path = require("path");

var app = express();

let php = path.join("www/php");
let rby = path.join("www/ruby");
let pl = path.join("www/perl");
let py = path.join("www/py");
let sport = 9090, shost = '127.0.0.1';

let config = {
    host: 'http://127.0.0.1:8000/',
    cbase: 'http://127.0.0.1:5000',
    curl: '/*',
    cport: 8000,
    chttps: {
        key: null,
        cert: null
    }
};

function proxyHandler(cgijs, config) {
    let h = cgijs.handler();
    let proxy = cgijs.proxy();
    const conn = h.startProxy({}, { base: config.cbase, url: config.curl, sport: config.cport, https: config.chttps });
    // h.setConn(config, conn);
    return proxy.setup(h, proxy, config);
}

// Subsystem for proxyHandler
app.use("/sub", proxyHandler(cgijs, config));

// Following is the structure for providing the decalration of paths
// app.use("/", some.cgi("/path/to/cgiscript/www/folder/with/or/without/filename", { web_files_root: php, bin_path: '/path/to/cgiexe/without/executable_name', config_path: '/path/to/some.ini', host: shost, port: sport }); 

// Following works without a local CGI path and tries to use CGI installed in system by default
// app.use("/", some.cgi("/path/to/cgiscript", { web_files_root: php, bin_path: '', config_path: '', host: shost, port: sport });

// Following uses a path in second argument defining the local copy of CGI that you want to use for the application
// app.use("/", some.cgi("/path/to/cgiscript", { web_files_root: php, bin_path: '/usr/bin/', config_path: '/path/to/cgi.ini', host: shost, port: sport });

// PHP File
app.use("/php", cgi.serve('php', { web_files_root: php, bin_path: '', config_path: '', host: shost, port: sport }));
// RB File
app.use("/rb", cgi.serve('rb', { web_files_root: rby, bin_path: '/usr/bin/', config_path: '', host: shost, port: sport }));
// PLC File
app.use("/plc", cgi.serve('plc', { web_files_root: pl, bin_path: '/usr/bin/', config_path: '', host: shost, port: sport }));
// PLD File
app.use("/pld", cgi.serve('pld', { web_files_root: pl, bin_path: '/usr/bin/', config_path: '', host: shost, port: sport }));
// PL File
app.use("/pl", cgi.serve('pl', { web_files_root: pl, bin_path: '/usr/bin/', config_path: '', host: shost, port: sport }));
// PYTHON File
app.use("/py", cgi.serve('py', { web_files_root: py, bin_path: '/usr/bin/', config_path: '', host: shost, port: sport }));
// PYTHON3 File
app.use("/py3", cgi.serve('py3', { web_files_root: py, bin_path: '/usr/bin/', config_path: '', host: shost, port: sport }));

app.use("/", function (req, res) {
    res.send(`
        "Testing my server"
    `);
});

app.listen(sport, shost);
console.log(`Server listening at ${sport}!`);

```

Explanation
-----------

The script will pipe all files based on language:

* 
* 
* 

Basic permalinks are supported but the support for them can probably be improved. 

Dependencies
------------


License
-------

Copyright © 2019 - till it works Ganesh B <ganeshsurfs@gmail.com>

The MIT License (MIT) - See [LICENSE](./LICENSE) for further details.
