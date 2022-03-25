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

    function createString(options) {
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

    function isEqual(baseObject, validateObj, exact = false, type = false) {
        let aProps = Object.getOwnPropertyNames(a);
        let bProps = Object.getOwnPropertyNames(b);

        if (!!exact) {
            if (aProps.length != bProps.length) {
                return false;
            }
        }
        for (let i = 0; i < aProps.length; i++) {
            if (!(bProps.includes(aProps[i]))) {
                return false;
            }
            if (typeof a[aProps[i]] === "object" && !Array.isArray(a[aProps[i]])) {
                isEquivalent(a[aProps[i]], b[aProps[i]], exact);
            }
            if (typeof a[aProps[i]] === "object" && Array.isArray(a[aProps[i]])) {
                // TODO: Do object checks here
            }
        }
        return true;
    }

    function allowedListItem(baseArray, name) {
        return baseArray.includes(name);
    }

    /**
	 *
	 * error
	 * 
	 * @param {String} msg
	 * 
	 * @return {throw error}
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

    function is_running(pid) {
        try {
            return process.kill(pid,0)
          }
          catch (e) {
            return e.code === 'EPERM'
          }
    }

    function convertArrayToObject(array, key) {
        const initialValue = {};
        return array.reduce(function (obj, item) {
          return {
            ...obj,
            [item[key]]: item,
          };
        }, initialValue);
      };
    
    return {
        convert: {
            array: createArray,
            string: createString,
            toObject: convertArrayToObject
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
