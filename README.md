# cgi-js
> run interpreted script files or their proxies
--------

Supports running Interpreted Language scripts running on express server. Supports both CGI executables as well as proxy to localhost/remote/embedded servers using proxying.



# Installation

```
npm install cgijs --save
```



# Features

* Run any scripts that support cgi based serving
* Run any host that servers a web app using proxy 
    - In App / Local / Remote proxy support
    - Allows embedding servers, which can be
* Allows
    - running multiple interpreters in one app
    - running multiple proxies in one app
    - multiple embedded servers in one app


> Light weight (Flexible)

#### Node CGI Embedded - run interpreted scripts that support cgi using nodejs



# Functionality Details

##### The script will pipe all files based on language:

* Python (2.x, 3.x)
* Perl (Version Independent)
* PHP (Version Independent)
* Ruby (Version Independent)

##### The script will pipe all proxies of above languages and following:

* Jsp (With Tomcat)
* Aspx (With IIS, Apache)

##### The script currently allows proxying to following servers:

* Apache HTTPD (Allows Embed & Proxy)
* Apache TomCat (Allows Embed & Proxy)
* Nginx (Allows Embed & Proxy)
* Mongoose (Allows Embed & Proxy)
* IIS (Allows Proxy)

> Basic permalinks are supported but the support for them can probably be improved. 



# Usage

This project contains example that demonstrates working with ExpressJS. To run CGI/Interpreted scripts with node js and express create the following script like below: 

```javascript


var express = require('express');
var cgijs = require("./src");
var cgi = cgijs.init();

// var cgi = require("cgijs");
var path = require("path");

var app = express();

let php = path.join("www/php");
let rby = path.join("www/ruby");
let pl = path.join("www/perl");
let py = path.join("www/py");
let sport = 9090, shost = '127.0.0.1';

let config = {
    host: 'http://127.0.0.1',
    port: 8000,
    cbase: 'http://127.0.0.1',
    cport: 5000,
    curl: '/*',
    chttps: {
        key: null,
        cert: null
    }
};

function proxyHandler(cgijs, config) {
    let h = cgijs.handler();
    let proxy = cgijs.proxy();
    const conn = h.startProxy({}, { base_host: config.cbase, base_port: config.cport, base_url: config.curl, proxy_host: config.host, proxy_port: config.port, https: config.chttps });
    // h.setConnection({config.cbase + config.cport.toString(): conn});
    return proxy.setup(h, proxy, config);
}

// Subsystem for proxyHandler
// Following is the structure for providing the 
//          proxyHandler decalaration of config

//      function proxyHandler(cgijs, config) {
//           let h = cgijs.handler();
//           let proxy = cgijs.proxy();
//           const conn = h.startProxy({}, { 
//               base: config.cbase,
//               url: config.curl,
//               sport: config.cport,
//               https: config.chttps
//           });
//          return proxy.setup(h, proxy, config);
//       }

//    app.use("/main-server-path", proxyHandler(cgijs-lib, {
//            host: 'https://path-to-proxy-server:port',
//            port: proxied-port,
//            cbase: 'https://path-to-your-web-app-server:port',
//            cport: webapp-port,
//            curl: '/*',
//            chttps: {
//                key: 'key-file',
//                cert: 'cert-file'
//            }

// Subsystem for proxyHandler
app.use("/sub", proxyHandler(cgijs, config));


// Following is the structure for providing the decalaration of paths

// app.use("/", cgi.serve('type_of_interpretor', { 
//         web_files_root: "/path/to/cgiscript/www/folder/with/or/without/filename", 
//         bin_path: '/path/to/cgiexe/without/executable_name', 
//         config_path: '/path/to/some.ini', 
//         host: shost, 
//         port: sport 
//     });

// Following works without a local CGI path and tries to 
//          use CGI installed in system by default

// app.use("/", cgi.serve("type_of_interpretor", { 
//         web_files_root: "/path/to/cgiscript/www/folder/with/or/without/filename", 
//         bin_path: '', 
//         config_path: '', 
//         host: shost, 
//         port: sport 
//     });

// Following uses a path in second argument defining the local copy of CGI 
//          that you want to use for the application

// app.use("/", cgi.serve("py", { 
//         web_files_root: /path/to/cgiscript, 
//         bin_path: '/usr/bin/', 
//         config_path: '/path/to/cgi.ini', 
//         host: shost, 
//         port: sport 
//     });

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



# Library Technical Specifications

...



# Dependencies

##### Library dependencies:
    - Nodejs: (> 8.x),
    - gateway: (> 1.0.0),
    - request: (> 2.88.2),
    - restana: (> 4.2.0),
    - shelljs: (= 0.6.1),
    - fast-proxy: (> 1.5.0)

##### Application Dependencies:
    - Your app, you decide
    - Example has "express": "^4.17.1"
    - OR, Use other Nodejs framework you want to use for your app



# Status

In development



# TODO

Check file - .todo



# License


Copyright © 2019 - till library works: Ganesh B <ganeshsurfs@gmail.com>

The MIT License (MIT) - See [LICENSE](./LICENSE) for further details.
