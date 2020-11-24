# cgi-js
    
    Run cgi / interpreted script files, or connect to cgi / other server proxies


Supports running cgi / Interpreted Language scripts running on node.js server. Supports both CGI executables as well as proxy to localhost/remote/embedded servers using proxying.


# Installation

```
npm install cgijs --save
```


# Features

    Light weight, Flexible, Generic implementation


##### Node CGI Embedded - run interpreted scripts that support cgi using nodejs

* [x] Run any scripts that support cgi based serving
* [x] Run any host that serves a web app using proxy 
    - [x] In App / Local / Remote proxy + websocket support
    - [] Allows Embedding Servers, which can run through proxies [TODO]
    - [] Allows running and closing processes
        * [] Runs unsupported proxy servers/ processes/ services [TODO]
        * [] Work with Embedded Database servers, Language embedded servers [TODO]
* [x] Allows
    - [x] running multiple interpreters in one app
    - [x] running multiple proxies + websockets in one app
    - [x] multiple embedded servers in one app
    - [x] multiple embedded databases in one app
* [x] Nodejs `Framework Independent / agnostic` for app development


# Functionality Details

##### The script will pipe all files of below interpreted languages:

* [x] Python (2.x, 3.x) - `py` (for Python .py extension files. Needed for *nix systems)
* [x] Perl (Version Independent) - `plc`, `pld`, `pl` (for Perl .pl, .plc, .pld extension files)
* [x] PHP (Version Independent) - `php` (for .php extension files)
* [x] Ruby (Version Independent) - `rb` (for Ruby .rb extension files)
* [x] Node.js (Version Independent) - `js` (for Node.js .js extension files)


##### The script will pipe all proxies of above languages and following:

* [x] Jsp (With Tomcat as proxy)
* [] Jsp (With Tomcat) [TODO]
* [x] Aspx (With IIS, Apache as proxy)
* [] Aspx (With Nginx, Apache) [TODO]


##### The script currently supports (tested) proxying to following web servers:

* [] Apache HTTPD (Allows Embed & Proxy) [TODO]
* [] Apache TomCat (Allows Embed & Proxy) [TODO]
* [] Nginx (Allows Embed & Proxy) [TODO]
* [] Mongoose (Allows Embed & Proxy) [TODO]
* [] IIS (Allows Proxy) [TODO]
* [x] Other Proxy-able local/remote servers


##### The script currently allows running (starting, stopping, restarting) following databases and processes:

* [] Mysql [TODO]
* [] PgSQL [TODO]
* [] Other Processes for your application support [TODO]


##### Note:
    This library is in active development. Issues, feedback as a github ticket is welcome.


##### Package Dependencies:

* Environment and Library dependencies:
    - Nodejs: (> 8.x),
    - request,
    - shelljs,
    - fast-proxy

* Application Dependencies:
    - Your app, you decide
    - Example/Demo has "express": "^4.17.1"
    - Alternatively, Use any other Nodejs framework you want to use for your app


##### Usage Demo:

This project contains example that demonstrates working with ExpressJS. To run CGI/Interpreted scripts with node js and express create the applications like in [demo folder](/demo): 


##### Use case:

[cgijs](https://www.npmjs.com/package/cgijs) library has been created to address following use cases:
    
- working with CGI / interpreted languages from any Node.js app
- using any CGI / interpreted languages apps with electron as demonstrated in functioning [desktop-cgi](https://github.com/ganeshkbhat/desktop-cgi) app


# Technical Specifications

...  * Wiki links to be added


### Wiki

* Getting started
    - Quick demo - CGI files
    - Quick demo - proxying to proxies/servers
    - Quick demo - proxying to proxy's websocket
* Run CGI files
    - PHP (.php)
    - Perl (Perl any versions - .plc, .pld, .pl)
    - Python (Python2, Python3 - .py)
    - Ruby (.rb)
    - Node.js (.js)
* Run Proxy servers to connect to:
    - Any Local http/https/websocket Servers
    - Any Remote http/https/websocket Servers
    - Embedded Apache httpd (http/https/websocket)
    - Embedded Apache tomcat (http/https/websocket)
    - Embedded Mongoose http server (http/https)
    - Embedded Nginx (http/https/websocket)
* Manage Embedded Servers (for desktop-cgi use case):
    - Embedded Apache httpd (http/https/websocket)
    - Embedded Apache tomcat (http/https/websocket)
    - Embedded Mongoose http server (http/https)
    - Embedded Nginx (http/https/websocket)
* Manage Embedded Database Servers (for desktop-cgi use case):
    - Embedded Mysql
    - Embedded PgSQL
    - Working with SQLite
* Run any executable/process based on need for application
* Working with config.json file for simpler implementation in apps

# Status

    In development [for allowing embedded server executables, and embedded databases]


# Todo

Check [.todo](./.todo) file for latest TODO list

<!-- # References -->


# License

The MIT License (MIT) - See [LICENSE](./LICENSE) for further details


Copyright © 2019 - till library works:
    Ganesh B <ganeshsurfs@gmail.com>


#### Please support the development in github repository through 
    - need reporting, 
    - testing, 
    - issue reporting, 
    - contribution 

