/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/

/* eslint no-console: 0 */
const os = require("os");
const fs = require("fs");

/**
 * 
 * utils
 * Common Utility Functions
 * 
 * 
 * @returns {Object} Utils module functions
 *      Module Object ==> { Utils Object }
 * 
 *              executableOptions [object]: {
 *                       valid [function],
 *                      set [function]
 *                  },
 *              os [object]: {
 *                       get [function],
 *                       valid [function],
 *                       set [function]
 *                  },
 *              processes [object]: {
 *                       valid [function],
 *                       set [function]
 *                   },
 *              portRanges [object]: {
 *                   valid [function],
 *                   set [function]
 *                  },
 *              proxyHandlers [object]: {
 *                   valid [function],
 *                   set [function]
 *                  },
 *              file [object]: {
 *                   get [function],
 *                   append [function],
 *                   set [function]
 *                  },
 *              csv [object]: {
 *                   get [function],
 *                   append [function],
 *                   set [function]
 *                  },
 *              json [object]: {
 *                   get [function],
 *                   set [function],
 *                   append [function]
 *                  },
 *              convert [object]: {
 *                  array [function],
 *                  string [function],
 *                  objectToArray [function],
 *                  arrayToObject [function],
 *                  csvToObject [function]
 *                 },
 *              allowedItem [function],
 *              isEqual [function],
 *              setter [function],
 *              getter [function],
 *              error [function],
 *              is_running [function]
 * 
 */
function utils() {

    let osList = ["win32", "win64", "Windows_NT", "darwin", "unix", "linux", "fedora", "debian"];
    let executableOptionList = ["executable", "service", "file"];
    let processList = ["httpd", "tomcat", "mongoose", "putty", "nginx", "mysql", "pgsql", "top", "mysql", "mongodb", "pgsql"];
    let proxyPortRanges = [[8000, 9500], [10000, 15000]];
    let validProxyHandlers = ["error", "proxyReq", "proxyRes", "open", "data", "end", "close", "upgrade"];

    /**
     * 
     * setter
     * 
     *
     * @param { Object } setterObject
     * 
     * @param { Object } values
     * 
     * @returns
     * 
     */
    function setter(setterObject, values) {
        let keys = Object.keys(values);
        if ((!values && typeof values !== "object") || (!keys.length)) { return false; }
        for (let i = 0; i < keys.length; i++) {
            setterObject[keys[i]] = values[keys[i]];
        }
        return setterObject;
    }


    /**
     * 
     * getter
     * 
     *
     * @param { Object } getterObject
     * 
     * @param { String | Number, Array[String | Number] } args
     * 
     * @returns { Boolean }
     * 
     */
    function getter(getterObject, args) {
        if (!args) { return false; }
        if (typeof args === "string" || typeof args === "number") {
            return (!!getterObject[args]) ? getterObject[args] : false;
        } else if (Array.isArray(args)) {
            let tmp = {}, alen = args.length;
            for (let i = 0; i < alen; i++) {
                if (!!getterObject[args[i]]) {
                    tmp[args[i]] = getterObject[args[i]];
                }
            }
            return (!Object.keys(tmp).length) ? false : tmp;
        }
        return false;
    }


    /**
     *
     *
     * @param { Object } options
     * 
     * @return { String } 
     */
    function convertObjectToString(options) {
        if (typeof options === "object") {
            let keys = Object.keys(options), str = " ", klen = keys.length;
            for (let i = 0; i < klen; i++) {
                str += " " + keys[i] + " " + options[keys[i]];
            }
            return str;
        } else if (typeof options === "string") {
            return options;
        } else {
            return error("Options type not suitable", true);
        }
    }


    /**
     * Set/ Add the OS in the list of OS
     *
     * @param { String } obj
     * 
     * @return { Boolean } 
     */
    function setOS(name) {
        return (typeof name === "string") ? osList.push(name) : false;
    }


    /**
     * Check if OS in the list of OS
     * 
     * @param { String } name
     * 
     * @return { Boolean } 
     */
    function validOS(name) {
        return allowedListItem(osList, name, "string");
    }


    /**
     * Get the OS of the current system
     * 
     * @return { String } 
     */
    function getOS() {
        return os.type();
    }


    /**
     * Set/ Add the executableOption in the list of executableOptions
     *
     * @param { String } name
     * 
     * @return { Boolean } 
     */
    function setExecutableOptionList(name) {
        return (typeof name === "string") ? executableOptionList.push(name) : false;
    }


    /**
     * Check if executableOption in the list of executableOptions
     * 
     * @param { String } name
     * 
     * @return { Boolean } 
     */
    function validExecutableOptionList(name) {
        return allowedListItem(executableOptionList, name, "string");
    }

    /**
     * Set/ Add the process in the list of processes
     *
     * @param { String } name
     * 
     * @return { Boolean } 
     */
    function setProcessList(name) {
        return (typeof name === "string") ? processList.push(name) : false;
    }


    /**
     * Check if process in the list of processes
     * 
     * @param { String } name
     * 
     * @return { Boolean } 
     */
    function validProcessList(name) {
        return allowedListItem(processList, name, "string");
    }

    /**
     * Set/ Add the string name of validProxyHandler in the list of validProxyHandlers
     *
     * @param { String } name
     * 
     * @return { Boolean } 
     */
    function setValidProxyHandlers(name) {
        return (typeof name === "string") ? validProxyHandlers.push(name) : false;
    }


    /**
     * Check if validProxyHandler in the list of validProxyHandlers
     * 
     * @param { String } name
     * 
     * @return { Boolean } 
     */
    function validValidProxyHandlers(name) {
        return allowedListItem(validProxyHandlers, name, "string");
    }


    /**
     * Set/ Add the validProxyHandler in the list of validProxyHandlers
     *
     * @param { String } range
     * 
     * @return { Boolean } 
     * 
     */
    function setProxyPortRanges(range) {
        return (Array.isArray(range) && range.length === 2) ? proxyPortRanges.push(range) : error("Range should be an array of length of 2", true);
    }


    /**
     * Check if proxyPortRange in the list of proxyPortRanges
     * 
     * @param { Array } range
     * range (array length of 2) - [start, end]
     * 
     * @return { Boolean } 
     * 
     */
    function validProxyPortRanges(range) {
        if (range.length !== 2) {
            return error("Range array length has to be an array of 2", true);
        }
        let plen = proxyPortRanges.length;
        for (let i = 0; i < plen; i++) {
            if (range[0] === proxyPortRanges[i][0] && range[1] === proxyPortRanges[i][1]) {
                return true;
            }
        }
        return false;
    }


    /**
     *
     *
     * @param { Object } options
     * 
     * @return { Array } 
     */
    function createArray(options) {
        let arr = [], keys = Object.keys(options), klen = keys.length;
        if (typeof options === "object") {
            for (let i = 0; i < klen; i++) {
                arr.push("-" + keys[i]).push(options[keys[i]]);
            }
            return arr;
        } else if (typeof options === "string") {
            arr.push(options);
            return arr;
        } else {
            return process.exit();
        }
    }


    /**
     *
     *
     * @param { Object } options
     * 
     * @return { Array } 
     */
    function convertObjectToArray(options) {
        let arr = [];
        if (typeof options === "object") {
            let keys = Object.keys(options), klen = keys.length;
            for (let i = 0; i < klen; i++) {
                arr.push([keys[i], options[keys[i]]]);
            }
            return arr;
        } else if (typeof options === "string") {
            arr.push(options);
            return arr;
        } else {
            return false;
        }
    }


    /**
     *
     *
     * @param { Object } baseObject
     * 
     * @param { Object | Array } validateObj
     * 
     * @param { Boolean } [exact=false]
     * 
     * @param { Boolean } [type=false]
     * 
     * @return {Boolean} 
     * 
     */
    function isEqual(baseObject, validateObj, exact = false, type = false) {
        let aProps = Object.getOwnPropertyNames(baseObject);
        let bProps = Object.getOwnPropertyNames(validateObj);

        if (!!exact) {
            if (aProps.length != bProps.length) {
                return false;
            }
        }
        for (let i = 0; i < aProps.length; i++) {
            if (!(bProps.includes(aProps[i]))) {
                return false;
            }
            if (typeof baseObject[aProps[i]] === "object" && !Array.isArray(baseObject[aProps[i]])) {
                isEqual(baseObject[aProps[i]], validateObj[aProps[i]], exact);
            }
            if (typeof baseObject[aProps[i]] === "object" && Array.isArray(baseObject[aProps[i]])) {
                // TODO: Do object checks here
            }
        }
        return true;
    }


    /**
     *
     *
     * @param { Array } baseArray
     * 
     * @param { String } name
     * 
     * @param { String } type
     * default = "string"
     * 
     * @return { Boolean } 
     * 
     */
    function allowedListItem(baseArray, name, type = "string") {
        return ((typeof name === type) && (baseArray.includes(name) || (baseArray.indexOf(name) !== -1))) ? name : false;
    }


    /**
     *
     * error
     * 
     * @param { String } msg
     * 
     * @return {No Return | throw error}
     * 
     */
    function error(msg, allowExit) {
        console.error(msg);
        if (!!allowExit) {
            process.exit(msg);
        } else {
            throw new Error(msg);
        }
    }


    /**
     *
     *
     * @param { Number } pid
     * 
     * @return { Boolean } 
     * 
     */
    function is_running(pid) {
        try {
            return process.kill(pid, 0)
        }
        catch (e) {
            return e.code === 'EPERM'
        }
    }


    /**
     *
     *
     * @param { Array } arr
     * 
     * @param { Boolean } [override=true]
     * 
     * @param { String } [seperator="-*-"]
     * 
     * @return { Array } 
     * 
     */
    function convertArrayToObject(arr, override = true, seperator = "-*-") {
        const initialValue = {};
        let count = 0;
        return arr.reduce(function (obj, item) {
            if (override === false) {
                count += 1;
            }
            if (!obj[item[0].toString()]) {
                return {
                    ...obj,
                    [item[0].toString()]: item[1],
                };
            }
            return {
                ...obj,
                [item[0].toString() + seperator + count]: item[1],
            };
        }, initialValue);
    };


    /**
     *
     *
     * @param { String } filename
     * 
     * @param { Object } options
     * 
     * @return {*} 
     */
    function getFile(filename, options) {
        return fs.readFileSync(filename, { "encoding": "utf8", ...options, "flags": "rs" });
    }


    /**
     *
     *
     * @param { String } filename
     * 
     * @param { Object } options
     * 
     * @return {*} 
     */
    function getJSONFile(filename, options) {
        return JSON.parse(getFile(filename, options));
    }


    /**
     *
     *
     * @param { String } filename
     * 
     * @param { Object } options
     * 
     * @param { String } [seperator=","]
     * 
     * @param { String } [linebreak="\n"]
     * 
     * @return {*} 
     */
    function getCSVFile(filename, options, seperator = ",", linebreak = "\n") {
        let str = getFile(filename, options);
        return convertCSVArrayToObject(str, seperator, linebreak);
    }


    /**
     *
     *
     * @param { String } filename
     * 
     * @param { String } data
     * 
     * @param { Object } options
     * 
     * @return {*} 
     */
    function setFile(filename, data, options) {
        return fs.writeFileSync(filename, data, { "encoding": "utf8", ...options, "flags": "w+" });
    }


    /**
     *
     *
     * @param { String } filename
     * 
     * @param { Object } data
     * 
     * @param { Object } options
     * 
     * @return {*} 
     */
    function setJSONFile(filename, data, options) {
        return setFile(filename, JSON.stringify(data), options);
    }


    /**
     *
     *
     * @param { String } filename
     * 
     * @param { String } data
     * 
     * @param { Object } options
     * 
     * @return {*} 
     */
    function setCSVFile(filename, data, options) {
        return setFile(filename, data, options);
    }


    /**
     *
     *
     * @param { String } filename
     * 
     * @param { String } data
     * 
     * @param { Object } options
     * 
     * @return {*} 
     */
    function appendFile(filename, data, options) {
        return fs.appendFileSync(filename, data, { "encoding": "utf8", ...options, "flags": "a+" });
    }


    /**
     *
     *
     * @param { String } filename
     * 
     * @param { String } data
     * 
     * @param { String } [options={ "encoding": "utf8" }]
     * 
     * @return {*} 
     */
    function appendCSV(filename, data, options) {
        // return appendFile(filename, data, { ...options, "flags": "a+" })
        return false;
    }


    /**
     *
     *
     * @param { String } filename
     * 
     * @param { Object } data
     * 
     * @param { Object } options
     * 
     * @return {*} 
     */
    function appendJSON(filename, data, options) {
        return appendFile(filename, JSON.stringify({
            ...getJSONFile(filename, {}),
            ...data
        }), options)
    }


    /**
     *
     *
     * @param { String } str
     * 
     * @param { String } [seperator=" "]
     * 
     * @param { String } [linebreak="\r\r\n"]
     * 
     * @return { Array } 
     * 
     */
    function convertCSVArrayToObject(str, seperator = " ", linebreak = "\n") {
        let result = str.split(linebreak).map((ai) => {
            return ai.split(seperator).filter((i) => { return !!i })
        });
        let headers = result[0], processArray = [];
        let rlen = result.length, hlen = headers.length;
        for (let i = 1; i < rlen; i++) {
            let o = {};
            for (let j = 0; j < hlen; j++) {
                o[headers[j]] = result[i][j];
            }
            processArray.push(o)
        }
        return processArray;
    }


    return {
        executableOptions: {
            valid: validExecutableOptionList,
            set: setExecutableOptionList
        },
        os: {
            get: getOS,
            valid: validOS,
            set: setOS
        },
        processes: {
            valid: validProcessList,
            set: setProcessList
        },
        portRanges: {
            valid: validProxyPortRanges,
            set: setProxyPortRanges
        },
        proxyHandlers: {
            valid: validValidProxyHandlers,
            set: setValidProxyHandlers
        },
        file: {
            get: getFile,
            append: appendFile,
            set: setFile
        },
        csv: {
            get: getCSVFile,
            append: appendCSV,
            set: setCSVFile
        },
        json: {
            get: getJSONFile,
            set: setJSONFile,
            append: appendJSON
        },
        convert: {
            array: createArray,
            string: convertObjectToString,
            objectToArray: convertObjectToArray,
            arrayToObject: convertArrayToObject,
            csvToObject: convertCSVArrayToObject
        },
        allowedItem: allowedListItem,
        isEqual: isEqual,
        setter: setter,
        getter: getter,
        error: error,
        is_running: is_running
    }

}

module.exports = utils;
