# cgi-js
    
    Run interpreted script files or connect to cgi / other server proxies


Supports running Interpreted Language scripts running on node.js server. Supports both CGI executables as well as proxy to localhost/remote/embedded servers using proxying.


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
    - [] Allows Embedding Servers, which can run through proxies [TODO]
    - [] Allows running and closing processes
        * [] Runs unsupported proxies/ processes/ services [TODO]
        * [] Work with Embedded Database servers, Language embedded servers [TODO]
* [x] Allows
    - [x] running multiple interpreters in one app
    - [x] running multiple proxies in one app
    - [x] multiple embedded servers in one app
    - [x] multiple embedded databases in one app
* [x] Nodejs framework independent / agnostic for app development


# Functionality Details

##### The script will pipe all files based on language:

* [x] Python (2.x, 3.x)
* [x] Perl (Version Independent)
* [x] PHP (Version Independent)
* [x] Ruby (Version Independent)
* [x] Node.js (Version Independent)


##### The script will pipe all proxies of above languages and following:

* [x] Jsp (With Tomcat as proxy)
* [] Jsp (With Tomcat) [TODO]
* [x] Aspx (With IIS, Apache as proxy)
* [] Aspx (With Nginx, Apache) [TODO]


##### The script currently allows proxying to following servers:

* [] Apache HTTPD (Allows Embed & Proxy) [TODO]
* [] Apache TomCat (Allows Embed & Proxy) [TODO]
* [] Nginx (Allows Embed & Proxy) [TODO]
* [] Mongoose (Allows Embed & Proxy) [TODO]
* [] IIS (Allows Proxy) [TODO]
* [x] Other Proxy-able local/remote servers


##### The script currently allows running (starting, stopping, restarting) following databases and process:

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
    
    - working with CGI files from any Node.js app
    - using any CGI apps with electron as demonstrated in functioning [desktop-cgi](https://github.com/ganeshkbhat/desktop-cgi) app

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
* Node.js - `js` (for Node.js .js extension files)


# Wiki

... * Use case: Run Single or Multiple Interpreted Language Web apps as a Single desktop app using Electron

* Run CGI files
    - PHP (.php)
    - Perl (Perl any versions - .plc, .pld, .pl)
    - Python (Python2, Python3 - .py)
    - Ruby (.rb)
    - Node.js (.js)
* Run Proxy servers to connect to:
    - Local http/https Servers
    - Remote http/https  Servers
    - Embedded Apache httpd (http/https)
    - Embedded Apache tomcat (http/https)
    - Embedded Mongoose http server (http/https)
    - Embedded Nginx (http/https)
* Manage Embedded Servers (for desktop-cgi use case):
    - Embedded Apache httpd (http/https)
    - Embedded Apache tomcat (http/https)
    - Embedded Mongoose http server (http/https)
    - Embedded Nginx (http/https)
* Manage Embedded Database Servers (for desktop-cgi use case):
    - Embedded Mysql
    - Embedded PgSQL
* Run any executable/process based on need for application


# Status

    In development [for allowing embedded server executables, and embedded databases]


# Todo

    Check .todo file for latest TODO list

    Add:
    - [] Manual commands [TODO]
    - [*] Command line options for all interpretors in config [Done]
    - [] Work with embedding Servers (HTTPD, Tomcat, Mongoose, Nginx, other using generic command function) [Partially done]
    - [] Work with embedding Database Servers (MySQL, PgSQL) [Partially done]
    - [] Work with any executables/processes [Partially done]

    Modify:
    - [*] Make config and options dynamic based on config file
    - [] Check Authentication for proxy connections for VLAN proxies [TODO]
    - [*] Add 'other' or 'custom' CGI executable option for unaccomodated interpreted lang support [Done]


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

