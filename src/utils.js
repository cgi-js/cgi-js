/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
*/

/**
 *
 *
 * @returns
 */
function utils() {

    /**
     * 
     * setter
     * 
     *
     * @param {Object} setterObject
     * 
     * @param {Object} values
     * 
     * @returns
     * 
     */
    function setter(setterObject, values) {
        keys = Object.keys(values);
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
     * @param {Object} getterObject
     * 
     * @param {String, Array} args
     * 
     * @returns {Boolean}
     * 
     */
    function getter(getterObject, args) {
        if (!args) { return false; }
        if (typeof args === "string" || typeof args === "number") {
            return (!!getterObject[args]) ? getterObject[args] : false;
        } else if (Array.isArray(args)) {
            let tmp = {};
            for (let i = 0; i < args.length; i++) {
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
     * @param {*} options
     * @return {*} 
     */
    function convertObjectToString(options) {
        if (typeof options === "object") {
            let keys = options.keys(), str = " ";
            for (let i = 0; i < keys.length; i++) {
                str += " " + keys[i] + " " + options[keys[i]];
            }
            return str;
        } else if (typeof options === "string") {
            return options;
        } else {
            throw new Error("Options type not suitable");
        }
    }

    /**
     *
     *
     * @param {*} options
     * @return {*} 
     */
    function createArray(options) {
        if (typeof options === "object") {
            let keys = Object.keys(options), arr = [];
            for (let i = 0; i < keys.length; i++) {
                arr.push("-" + keys[i]).push(options[keys[i]]);
            }
            return arr;
        } else if (typeof options === "string") {
            return arr.push(options);
        } else {
            process.exit();
        }
    }

    /**
     *
     *
     * @param {*} options
     * @return {*} 
     */
    function convertObjectToArray(options) {
        let arr = [];
        if (typeof options === "object") {
            let keys = Object.keys(options);
            for (let i = 0; i < keys.length; i++) {
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
     * @param {*} baseObject
     * @param {Object | Array} validateObj
     * @param {boolean} [exact=false]
     * @param {boolean} [type=false]
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
     * @param {Array} baseArray
     * @param {String} name
     * 
     * @return {Boolean} 
     * 
     */
    function allowedListItem(baseArray, name) {
        return baseArray.includes(name);
    }

    /**
     *
     * error
     * 
     * @param {String} msg
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
     * @param {*} pid
     * 
     * @return {Boolean} 
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
     * @param {Array} arr
     * @param {boolean} [override=true]
     * @param {string} [seperator="--*--"]
     * 
     * @return {Array} 
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
                [item[0].toString()]: item[1],
            };
        }, initialValue);
    };

    /**
     *
     *
     * @param {Array} arr
     * @param {string} [seperator=" "]
     * @param {string} [linebreak="\r\r\n"]
     * 
     * @return {Array} 
     * 
     */
    function convertCSVArrayToObject(arr, seperator = " ", linebreak = "\r\r\n") {
        let result = arr.split(linebreak).map((ai) => {
            return ai.split(seperator).filter((i) => { return !!i })
        });
        let headers = result[0], processArray = [];
        for (let i = 1; i < result.length; i++) {
            let o = {};
            for (let j = 0; j < headers.length; j++) {
                o[headers[j]] = result[i][j];
            }
            processArray.push(o)
        }
        return processArray;
    }

    return {
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
