export = utils;
/**
 *
 * utils
 * Common Utility Functions
 *
 *
 * @returns { UtilsObject<{
 *                  shell: shellMod,
 *                  executableOptions: {
 *                      valid: validExecutableOptionList,
 *                      set: setExecutableOptionList
 *                  },
 *                  os: {
 *                      get: getOS,
 *                      valid: validOS,
 *                      set: setOS,
 *                      type: getOS,
 *                      platform: getPlatform,
 *                      arch: getArch
 *                  },
 *                  processes: {
 *                      valid: validProcessList,
 *                      set: setProcessList
 *                  },
 *                  portRanges: {
 *                      valid: validProxyPortRanges,
 *                      set: setProxyPortRanges
 *                  },
 *                  proxyHandlers: {
 *                      valid: validValidProxyHandlers,
 *                      set: setValidProxyHandlers
 *                  },
 *                  file: {
 *                      get: getFile,
 *                      append: appendFile,
 *                      set: setFile,
 *                      exists: fileExists
 *                  },
 *                  csv: {
 *                      get: getCSVFile,
 *                      append: appendCSV,
 *                      set: setCSVFile
 *                  },
 *                  json: {
 *                      get: getJSONFile,
 *                      set: setJSONFile,
 *                      append: appendJSON
 *                  },
 *                  convert: {
 *                      array: createArray,
 *                      string: convertObjectToString,
 *                      objectToArray: convertObjectToArray,
 *                      arrayToObject: convertArrayToObject,
 *                      csvToObject: convertCSVArrayToObject
 *                  },
 *                  allowedItem: allowedListItem,
 *                  isEqual: isEqual,
 *                  setter: setter,
 *                  getter: getter,
 *                  error: error,
 *                  is_running: is_running
 *          }> }
 *
 *      Utils module functions.
 *      Module Object ==> { Utils Object }
 *
 */
declare function utils(): UtilsObject<{
    shell: shellMod;
    executableOptions: {
        valid: (name: string) => boolean;
        set: (name: string) => boolean;
    };
    os: {
        get: () => string;
        valid: (name?: string) => boolean;
        set: (name: any) => boolean;
        type: () => string;
        platform: () => string;
        arch: () => string;
    };
    processes: {
        valid: (name: string) => boolean;
        set: (name: string) => boolean;
    };
    portRanges: {
        valid: (range: any[]) => boolean;
        set: (range: string) => boolean;
    };
    proxyHandlers: {
        valid: (name: string) => boolean;
        set: (name: string) => boolean;
    };
    file: {
        get: (filename: string, options: any) => any;
        append: (filename: string, data: string, options: any) => any;
        set: (filename: string, data: string, options: any) => any;
        exists: (filename: any, pathname: any) => any;
    };
    csv: {
        get: (filename: string, options: any, seperator?: string, linebreak?: string, resulttype?: string) => any;
        append: (filename: string, data: string, options?: string) => any;
        set: (filename: string, data: string, options: any) => any;
    };
    json: {
        get: (filename: string, options: any) => any;
        set: (filename: string, data: any, options: any) => any;
        append: (filename: string, data: any, options: any) => any;
    };
    convert: {
        array: (options: any) => any[];
        string: (options?: any) => string;
        objectToArray: (options: any) => any[];
        arrayToObject: (arr: any[], override?: boolean, seperator?: string) => any[];
        csvToObject: (str: string, seperator?: string, linebreak?: string, resulttype?: string) => any[];
    };
    allowedItem: (baseArray: any[], name: string, type?: string) => boolean;
    isEqual: (baseObject: any, validateObj: any | any[], exact?: boolean, type?: boolean) => boolean;
    setter: (setterObject?: any, values?: any) => any;
    getter: (getterObject?: any, args?: string | number | any[][string | number]) => boolean;
    error: (msg: string, allowExit: any) => No;
    is_running: (pid: number) => boolean;
}>;
