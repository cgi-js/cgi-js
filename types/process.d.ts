export = handler;
/**
 *
 * handler
 * Process Execution and Management handler
 *
 *
 * @returns { ProcessObject<{
 *              setup: setupHandler,
 *              process: {
 *                  set: setProcess, get: getProcess, registerHandlers: registerEventHandlers,
 *                  exec: exec, execFile: execFile, fork: fork, spawn: spawn,
 *                  executeProcess: executeProcess, executeAction: executeAction,
 *                  fetchRunning: fetchRunningProcess, find: findRunningProcess,
 *                  killProcess: killProcess, kill: kill
 *              }
 *          }> }
 *
 * Contains Process module functions
 *
 * Process Module Object => { ProcessObject }
 *
 *
 */
declare function handler(): ProcessObject<{
    setup: (name?: string, optionsObject?: string | any[] | any) => boolean;
    process: {
        set: (processConf?: any) => boolean | any;
        get: (processNames?: string | any[]) => boolean | any;
        registerHandlers: (processConf: any, eventHandlers?: EventHandlers<{
            eventname: (data: any) => any;
        }>) => any;
        exec: (exe?: string, args?: any[], cmdOptions?: any, dataHandler?: DataHandler<(error: any, stdout: any, stderr: any) => any>) => any;
        execFile: (file?: string, args?: any[], cmdOptions?: any, dataHandler?: DataHandler<(error: any, stdout: any, stderr: any) => any>) => any;
        fork: (modulePath?: string, args?: any[], cmdOptions?: any, dataHandler?: DataHandler<(error: any, stdout: any, stderr: any) => any>, handlers?: Handlers<(data: any) => any>) => any;
        spawn: (exe?: string, args?: any[], cmdOptions?: any, dataHandler?: DataHandler<(error: any, stdout: any, stderr: any) => any>, handlers?: Handlers<(data: any) => any>) => any;
        executeProcess: (processConf?: any, dataHandler?: DataHandler<(error: any, stdout: any, stderr: any) => any>, cleanupHandler?: CleanupHandler<(options: any, prc: any) => any>, handlers?: Handlers<{
            eventname: (data: any) => any;
        }>) => any;
        executeAction: (name: string, action: string, dataHandler?: DataHandler<(error: any, stdout: any, stderr: any) => any>, cleanupHandler?: CleanupHandler<(options: any, prc: any) => any>) => boolean | any;
        fetchRunning: (cmdOptions?: any, dataHandler?: DataHandler<(error: any, stdout: any, stderr: any) => any>) => any;
        find: (cmdOptions?: any, dataHandler?: DataHandler<(error: any, stdout: any, stderr: any) => any>, conditions?: any) => any;
        killProcess: (name?: string, signal?: any | number | string) => boolean | any;
        kill: (pid?: number, signal?: any | number | string) => boolean;
    };
}>;
