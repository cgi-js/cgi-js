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
var cgi = require("cgijs"); 
var path = require("path"); 

var app = express();

// Following is the structure for providing the decalration of paths
// app.use("/", some.cgi("/path/to/cgiscript"), '/path/to/cgi.exe', '/path/to/some.ini'); 

// Following works without a local CGI path and tries to use CGI installed in system by default
// app.use("/", some.cgi("/path/to/cgiscript"), '', ''); 

// Following uses a path in second argument defining the local copy of CGI that you want to use for the application
app.use("/", some.cgi("/path/to/cgiscript"), '/usr/bin/', '/path/to/cgi.ini'); 

app.listen(9090);
console.log("Server listening!");
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
