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

    function validate(baseObject, validateObj) { }
    function allowedListItem(baseArray, name) {}

    return {
        convert: {
            array: createArray,
            string: createString,
            allowedItem: allowedListItem,    
            validate: validate
        }
    }
}

module.exports = utils;
