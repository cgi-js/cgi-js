# cgi-js
    
    Run interpreted script files or connect to cgi / other server proxies


Supports running Interpreted Language scripts running on express server. Supports both CGI executables as well as proxy to localhost/remote/embedded servers using proxying.


# Installation

```
npm install cgijs --save
```


# Features

    Light weight, Flexible, Generic implementation


##### Node CGI Embedded - run interpreted scripts that support cgi using nodejs

* [x] Run any scripts that support cgi based serving
* [x] Run any host that serves a web app using proxy 
    - [x] In App / Local / Remote proxy support
    - [] Allows Embedding Servers, which can run proxies [TODO]
    - [] Allows running and closing processes
        * Runs unsupported proxies/ processes/ services [TODO]
        * Work with Embedded Database servers, Language embedded servers [TODO]
* [x] Allows
    - [x] running multiple interpreters in one app
    - [x] running multiple proxies in one app
    - [x] multiple embedded servers in one app
* [x] Nodejs framework independent / agnostic for app development


# Functionality Details

##### The script will pipe all files based on language:

* [x] Python (2.x, 3.x)
* [x] Perl (Version Independent)
* [x] PHP (Version Independent)
* [x] Ruby (Version Independent)


##### The script will pipe all proxies of above languages and following:

* [x] Jsp (With Tomcat as proxy)
* [] Jsp (With Tomcat) [TODO]
* [x] Aspx (With IIS, Apache as proxy)
* [] Aspx (With IIS, Apache) [TODO]


##### The script currently allows proxying to following servers:

* [] Apache HTTPD (Allows Embed & Proxy) [TODO]
* [] Apache TomCat (Allows Embed & Proxy) [TODO]
* [] Nginx (Allows Embed & Proxy) [TODO]
* [] Mongoose (Allows Embed & Proxy) [TODO]
* [] IIS (Allows Proxy) [TODO]
* [x] Other Proxy-able local/remote servers

##### Note:
    Basic permalinks are supported but the support for them can probably be improved. 


##### Package Dependencies:

* Environment and Library dependencies:
    - Nodejs: (> 8.x),
    - request,
    - shelljs,
    - fast-proxy

* Application Dependencies:
    - Your app, you decide
    - Example has "express": "^4.17.1"
    - OR, Use other Nodejs framework you want to use for your app


##### Usage Demo:

This project contains example that demonstrates working with ExpressJS. To run CGI/Interpreted scripts with node js and express create the following script like below: 


```javascript


var express = require('express');
var cgijs = require("cgijs");
var cgi = cgijs.init();

var path = require("path");

var app = express();

let php = path.join("www/php");
let rby = path.join("www/ruby");
let pl = path.join("www/perl");
let py = path.join("www/py");
let sport = 9090, shost = '127.0.0.1';

let config = {
    proxy_host: 'http://127.0.0.1',
    proxy_port: 8000,
    remote_host: 'http://127.0.0.1',
    remote_port: 5000,
    remote_url: '/*',
    https: {
        key: null,
        cert: null
    }
};

function proxyHandler(cgijs, config) {
    let h = cgijs.handler();
    const conn = h.proxy.start({}, config);
    // h.setter.connection({config.cbase + config.cport.toString(): conn});
    return h.proxy.setup(h, config, h.proxy.serve);
}

// Subsystem for proxyHandler
// Following is the structure for providing the 
//          proxyHandler decalaration of config

// function proxyHandler(cgijs, config) {
//     let h = cgijs.handler();
//     const conn = h.proxy.start({}, config);
//     // h.setter.connection({config.remote_host + config.remote_port.toString(): conn});
//     return h.proxy.setup(h, config, h.proxy.serve);
// }

//    app.use("/main-server-path", proxyHandler(cgijs-lib, {
//            proxy_host: 'https://path-to-proxy-server',
//            proxy_port: proxied-port,
//            remote_host: 'https://path-to-your-web-app-server',
//            remote_port: webapp-port,
//            remote_url: '/*',
//            https: {
//                key: 'key-file',
//                cert: 'cert-file'
//            })
//      )

// Subsystem for proxyHandler
app.use("/sub", proxyHandler(cgijs, config));


// Following is the structure for providing the decalaration of paths

// Example 1:
// app.use("/", cgi.serve('type_of_interpretor', { 
//         web_root_folder: "/path/to/cgiscript/www/folder/with/or/without/filename", 
//         bin: {
//                 bin_path: '/path/to/cgi-executable-dir/without-executable-name/',
//                 useDefault: true,
//         }
//         config_path: '/path/to/some.ini', 
//         host: shost, 
//         port: sport 
//     });

// Example 2:
// app.use("/", cgi.serve("type_of_interpretor", { 
//         web_root_folder: "/path/to/cgiscript/www/folder/with/or/without/filename", 
//         bin: '/path/to/cgi-executable-dir/without-executable-name/',
//         config_path: '', 
//         host: shost, 
//         port: sport 
//     });


// Following works without a local CGI path and tries to 
//          use CGI installed in system by default
// if useDefault is false then the application errors out
// Default value of useDefault is false. Example: 6 and Example: 7 will error out

// Example 3:
// app.use("/", cgi.serve("type_of_interpretor", { 
//         web_root_folder: "/path/to/cgiscript/www/folder/with/or/without/filename", 
//         bin: {
//                 bin_path: '/path/to/cgi-executable-dir/without-executable-name/'
//         }
//         config_path: '', 
//         host: shost, 
//         port: sport 
//     });


// Example 4:
// app.use("/", cgi.serve("type_of_interpretor", { 
//         web_root_folder: "/path/to/cgiscript/www/folder/with/or/without/filename", 
//         bin: {
//                 bin_path: '',
//                 useDefault: true,
//         }
//         config_path: '', 
//         host: shost, 
//         port: sport 
//     });

// Example 5:
// app.use("/", cgi.serve("type_of_interpretor", { 
//         web_root_folder: "/path/to/cgiscript/www/folder/with/or/without/filename", 
//         bin: {
//                 useDefault: true,
//         }
//         config_path: '', 
//         host: shost, 
//         port: sport 
//     });

// Example 6:
// app.use("/", cgi.serve("type_of_interpretor", { 
//         web_root_folder: "/path/to/cgiscript/www/folder/with/or/without/filename", 
//         bin: '',
//         config_path: '', 
//         host: shost, 
//         port: sport 
//     });

// Example 7:
// app.use("/", cgi.serve("type_of_interpretor", { 
//         web_root_folder: "/path/to/cgiscript/www/folder/with/or/without/filename", 
//         config_path: '', 
//         host: shost, 
//         port: sport 
//     });


// Following uses a path in second argument defining the local copy of CGI 
//          that you want to use for the application 
//          (Specially true if you are using multiple versions of the same executable in OS)

// Example 8:
// app.use("/", cgi.serve("type_of_interpretor", { 
//         web_root_folder: /path/to/cgiscript, 
//         bin: '/path/to/cgi-executable-dir/without-executable-name/', 
//         config_path: '/path/to/cgi.ini', 
//         host: shost, 
//         port: sport 
//     });

// Example 9:
// app.use("/", cgi.serve("type_of_interpretor", { 
//         web_root_folder: "/path/to/cgiscript/www/folder/with/or/without/filename", 
//         bin: '/usr/bin/',
//         config_path: '', 
//         host: shost, 
//         port: sport 
//     });


// PHP File: Use bin as string
app.use("/php", cgi.serve('php', { web_root_folder: php, bin: '/usr/bin/', config_path: '', host: shost, port: sport, cmd_options: {} }));
// PHP File: Use bin as object definition
app.use("/phpud", cgi.serve('php', { web_root_folder: php, bin: { bin_path: '', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PHP File: Use bin as Object definition with useDefault false
app.use("/phpnud", cgi.serve('php', { web_root_folder: php, bin: { bin_path: '/usr/bin/', useDefault: false }, config_path: '', host: shost, port: sport, cmd_options: {} }));

// RB File
app.use("/rb", cgi.serve('rb', { web_root_folder: rby, bin: '/usr/bin/', config_path: '', host: shost, port: sport, cmd_options: {} }));
// RB File
app.use("/rbud", cgi.serve('rb', { web_root_folder: rby, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));

// PLC File
app.use("/plc", cgi.serve('plc', { web_root_folder: pl, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PLD File
app.use("/pld", cgi.serve('pld', { web_root_folder: pl, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PL File
app.use("/pl", cgi.serve('pl', { web_root_folder: pl, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));

// PYTHON File
app.use("/py", cgi.serve('py', { web_root_folder: py, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// PYTHON3 File
app.use("/py3", cgi.serve('py3', { web_root_folder: py, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));

app.use("/", function (req, res) {
    res.send(`
        "Testing my server"
    `);
});


app.listen(sport, shost);
console.log(`Server listening at ${sport}!`);

```


# Technical Specifications

...  * Wiki link to be added

### Type of Interpreters (type_of_interpretor)

* PHP - `php` (for .php extension files)
* Python 3 - `py3` (for Python .py extension files. Needed for *nix systems)
* Python 2 - `py` (for Python .py extension files. Needed for *nix systems)
* Ruby - `rb` (for Ruby .rb extension files)
* Perl - `plc` (for Perl .plc extension files)
* Perl - `pld` (for Perl .pld extension files)
* Perl - `pl` (for Perl .pl extension files)


# Wiki

... * Use case: Run Single or Multiple Interpreted Language Web apps as a Single desktop app using Electron


# Status

    In development [for allowing embedded server executables]


# Todo

    Check .todo file for latest TODO list

    Add:
    - Manual commands
    - Command line options for all interpretors in config
    - Add embedding Servers (HTTPD, Tomcat, Mongoose, Nginx, other using generic command function)

    Modify:
    - Make config and options dynamic based on config file
    - Check Authentication for proxy connections for VLAN proxies
    - Add 'other' or 'custom' CGI executable option for unaccomodated interpreted lang support


# References


# License

The MIT License (MIT) - See [LICENSE](./LICENSE) for further details


Copyright © 2019 - till library works:
    Ganesh B <ganeshsurfs@gmail.com>


# Please support the development in github repository through 
    - need reporting, 
    - testing, 
    - issue reporting, 
    - contribution 

