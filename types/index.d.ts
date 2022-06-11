declare const _exports: {
    init: typeof fileMod.serve;
    file: typeof fileMod;
    proxy: typeof proxyMod;
    process: typeof processMod;
    utils: typeof utilsMod;
    "default-configs": {
        proxy: {
            options: {
                target: {
                    protocol: string;
                    host: string;
                    port: number;
                    pfx: null;
                    passphrase: string;
                };
                ws: boolean;
                secure: boolean;
                xfwd: boolean;
                toProxy: boolean;
                prependPath: boolean;
                ignorePath: boolean;
                changeOrigin: boolean;
                preserveHeaderKeyCase: boolean;
                auth: string;
                hostRewrite: boolean;
                protocolRewrite: null;
                cookieDomainRewrite: boolean;
                cookiePathRewrite: boolean;
                headers: {};
                proxyTimeout: number;
                timeout: number;
                selfHandleResponse: boolean;
                buffer: null;
                ssl: {
                    key: null;
                    cert: null;
                };
            };
            listenPort: number;
            stream: boolean;
            modify: boolean;
            runtime: boolean;
        };
        process: {
            name: string;
            type: string;
            os: string;
            exe: string;
            cmds: {
                start: {
                    usage: string;
                    args: undefined[];
                };
                stop: {
                    usage: string;
                    args: undefined[];
                };
                restart: {
                    usage: string;
                    args: undefined[];
                };
                generic: {
                    exe: string;
                    usage: string;
                    args: undefined[];
                };
                startbatwin32: {
                    exe: string;
                    usage: string;
                    args: undefined[];
                };
                stopbatwin32: {
                    exe: string;
                    usage: string;
                    args: undefined[];
                };
                startbatWindows_NT: {
                    exe: string;
                    usage: string;
                    args: undefined[];
                };
                stopbatWindows_NT: {
                    exe: string;
                    usage: string;
                    args: undefined[];
                };
                startbatlinux: {
                    exe: string;
                    usage: string;
                    args: undefined[];
                };
                stopbatlinux: {
                    exe: string;
                    usage: string;
                    args: undefined[];
                };
                startbatmac: {
                    exe: string;
                    usage: string;
                    args: undefined[];
                };
                stopbatmac: {
                    exe: string;
                    usage: string;
                    args: undefined[];
                };
            };
            options: {
                stdio: string;
                shell: boolean;
            };
            other: {
                paths: {
                    conf: string;
                    exe: string;
                };
                env: string;
                setprocess: boolean;
                executetype: string;
                command: string;
            };
        };
    };
    middlewares: {
        file: {
            express: (req: any, res: any, next: any) => void;
            koa: (ctx: any, next: any) => void;
            nest: (req: any, res: any, next: any) => void;
            loopback: (ctx: any, next: any) => void;
            sails: (req: any, res: any, next: any) => void;
            totaljs: ($: any) => void;
            hapi: (req: any, h: any) => any;
            feather: (ctx: any) => any;
            adonis: (ctx: any, next: any) => void;
        };
        proxy: {
            express: (req: any, res: any, next: any) => void;
            koa: (ctx: any, next: any) => void;
            nest: (req: any, res: any, next: any) => void;
            loopback: (ctx: any, next: any) => void;
            sails: (req: any, res: any, next: any) => void;
            totaljs: ($: any) => void;
            hapi: (req: any, h: any) => any;
            feather: (ctx: any) => any;
            adonis: (ctx: any, next: any) => void;
        };
    };
};
export = _exports;
import fileMod = require("./file");
import proxyMod = require("./proxy");
import processMod = require("./process");
import utilsMod = require("./utils");
