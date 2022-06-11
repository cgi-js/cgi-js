export = handler;
/**
 *
 * handler
 * Proxy Management handler
 *
 *
 * @returns { ProxyObject<{
 *                  setup: setupHandler, init: undefined,
 *                  config: {
 *                      set: setConfig,
 *                      get: getConfig
 *                  },
 *                  proxy: {
 *                      socks: socks, udp: udpproxy, http: httpproxy,
 *                      tcp: socketproxy,
 *                      redirect: {
 *                          http2socks: http2socks
 *                      },
 *                      setup: setupProxy,
 *                      get: getProxy,
 *                      start: startProxy,
 *                      stop: stopProxy,
 *                      serve: serveProxy
 *                  }
 *           }> }
 *
 *      Proxy module functions.
 *      Module Object ==> { ProxyObject }
 *
 */
declare function handler(): ProxyObject<{
    setup: (name?: string, optionsObject?: any[]) => boolean;
    init: undefined;
    config: {
        set: (options: any) => boolean | any;
        get: (args: string | any[]) => boolean | any;
    };
    proxy: {
        socks: typeof socks;
        udp: udpproxy;
        http: httpproxy;
        tcp: socketproxy;
        redirect: {
            http2socks: http2socks;
        };
        setup: (name?: string, config?: any, handlerFunctions?: HandlerFunctions<{
            eventname: (data: any) => any;
        }>) => boolean;
        get: (name?: string | any[]) => boolean | any;
        start: (config: any) => boolean | any;
        stop: (proxy: string | any) => boolean;
        serve: (name?: string) => boolean | any;
    };
}>;
import socks = require("socks");
