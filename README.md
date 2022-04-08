# cgijs
    

*`CGIJS` is a library to run any `CGI` / `Interpreted language script files`, or connect to any web application server proxies, or manage processes in the system.*


`CGIJS` supports running any `CGI` / `Interpreted Language scripts` in `any OS` that runs `node.js`. It supports both `CGI` executables as well as `proxy` to `localhost`/ `remote` /`embedded servers` using proxying. It also supports managing processes like `embedded` `server` executables, embedded `database` executables, or `any other` embedded executables *[todo]*


`[Funding Invited]`


# History

CGIJS was created with a motivation to allow creation of a `Desktop executable/ application` using `Electron` that can run any `CGI` / `Interpreted language scripted files/ applications` under the hood. 


[![Desktop CGI](./desktop-cgi.jpeg)](https://github.com/ganeshkbhat/desktop-cgi)


# Installation

```
npm install cgijs --save
```


# Features

*Light weight, Flexible, Generic implementation. CGIJS is Nodejs `Framework Independent / agnostic` for application development.*


There are three main modules inside CGIJS - `file` for CGI file execution, `proxy` for running proxies, and `process` for managing processes.


##### Node CGI Embedded - run interpreted scripts that support cgi using nodejs

* [x] CGI file execution
    - [x] Run any scripts that support CGI based serving/execution
    - [x] Run multiple CGI executables/ Interpreters in one or multiple applications
    - [x] Embed your own CGI/ Interpreted Language executables


##### Node Web Proxy - run web proxies

* [x] Running Proxies
    - [x] Run any host that serves a web app, using proxy 
    - [x] Run proxies for Application (Local / Remote)
    - [x] Supports websocket implementation in web proxies
    - [x] Run multiple proxies + websockets in one or multiple applications


##### Node Processes - Manage web servers, database processes, or other system processes or services

* [x] Manage Processes or Services
    - [x] Allows running and closing process Executables
    - [x] Allows managing Embedding Web Servers, which can run web applications through proxies [TODO Testing]
    - [x] Allows managing Embedded Database servers [TODO Testing]
    - [x] Should run smoothly with Unsupported proxy servers/ processes/ services (not widely tested)
* [x] Embedding
    - [x] Multiple web servers in one or multiple applications
    - [x] Multiple databases in one or multiple applications


# Functionality Details

##### The script should support piping all files of below interpreted languages:

* [x] Python (2.x, 3.x) - `py` (for Python .py extension files. Needed for *nix systems)
* [x] Perl (Version Independent) - `plc`, `pld`, `pl` (for Perl .pl, .plc, .pld extension files)
* [x] PHP (Version Independent) - `php` (for .php extension files)
* [x] Ruby (Version Independent) - `rb` (for Ruby .rb extension files)
* [x] Node.js (Version Independent) - `js` (for Node.js .js extension files)


##### The script should support piping all proxies of above languages and following:

* [x] Jsp (With Tomcat, or any webserver as proxy)
* [x] Aspx (With IIS, Apache, or any webserver as proxy)
* [] Jsp (With Tomcat embedded) [TODO]
* [] Aspx (With Nginx and Apache embedded) [TODO]


##### The script currently allows working with (starting, stopping, restarting) following web servers:

* [x] IIS (Allows Proxy)
* [x] Nginx (Allows Embed & Proxy) [TODO]
* [] Apache HTTPD (Allows Embed & Proxy) [TODO]
* [] Apache TomCat (Allows Embed & Proxy) [TODO]
* [] Mongoose (Allows Embed & Proxy) [PLANNED]
* [] Jetty (Allows Embed & Proxy) [PLANNED]
* [] Putty (Allows Embed & Proxy) [PLANNED]
* [x] Other Proxy-able local/remote servers


##### The script currently allows working with (starting, stopping, restarting) following databases and processes:

* [] Mysql [TODO]
* [] MongoDB [TODO]
* [] PgSQL [TODO]
* [] Redis [TODO]
* [x] Other Processes for your application support


##### Note:

*This library is in active development. Issues, and feedbacks as github ticket are welcome.*


##### Package Dependencies:

* Environment and Library dependencies:
    - Nodejs: (> 8.x),
    - shelljs,
    - fast-proxy 

* Application Dependencies:
    - Your app, you decide
    - Example/Demo has "express": "^4.17.1"
    - Alternatively, Use any other Nodejs framework you want to use for your app


##### Usage Demo:

This project contains example that demonstrates working with ExpressJS.

- The demos for runing CGI/Interpreted scripts with node.js and express applications can be found in the folder [demo app](https://github.com/ganeshkbhat/cgi-js/tree/master/demo/demo-app).
- The demos for individual implementation of file, process, proxy, and utils modules can be found in the folder [demo usage [todo]](https://github.com/ganeshkbhat/cgi-js/tree/master/demo/demo-usage)


##### Use case:

[cgijs](https://www.npmjs.com/package/cgijs) library has been created to address following use cases:
    
- working with CGI / interpreted languages from `any` Node.js app framework
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
    - Embedded Apache httpd, Apache tomcat, Nginx (http/https/websocket)
    - Embedded Mongoose http server (http/https)
* Manage Embedded Servers (for desktop-cgi use case):
    - Embedded Apache httpd (http/https/websocket)
    - Embedded Apache tomcat (http/https/websocket)
    - Embedded Mongoose http server (http/https)
    - Embedded Nginx (http/https/websocket)
* Manage Embedded Database Servers (for desktop-cgi use case):
    - Embedded Mysql
    - Embedded MongoDB
    - Embedded PgSQL
    - Working with SQLite
* Run any executable/process based on need for application
* Working with config.json file for simpler implementation in apps


# Status

In development [for allowing embedded server executables, embedded databases, or any other embedded application binaries]


# Todo

Check [.todo](./.todo) file for latest TODO list

<!-- # References -->


# License

The MIT License (MIT) - See [LICENSE](./LICENSE) for further details


Copyright © 2019 - till library works:
    Ganesh B <ganeshsurfs@gmail.com>


#### Please support the development in github repository through 
    - feature needs reporting,
    - testing,
    - issue reporting,
    - contribution

