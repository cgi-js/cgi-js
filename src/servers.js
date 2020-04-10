// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 

function servers() {

    function start() {

    }

    function stop() {
        
    }

    function startHttpd() {

    }

    function stopHttpd() {

    }

    function startNginx() {

    }

    function stopNginx() {

    }

    function startMongoose() {

    }

    function stopMongoose() {

    }

    function startPutty() {

    }

    function stopPutty() {

    }

    function startTomcat() {

    }

    function stopTomcat() {

    }

    return {
        httpd: {
            start: startHttpd,
            stop: stopHttpd
        },
        nginx: {
            start: startNginx,
            stop: stopNginx
        },
        mongoose: {
            start: startMongoose,
            stop: stopMongoose
        },
        putty: {
            start: startPutty,
            stop: stopPutty
        },
        tomcat: {
            start: startTomcat,
            stop: stopTomcat
        },
        server: {
            start: start,
            stop: stop
        }
    }

}
