export namespace proxy {
    namespace options {
        namespace target {
            const protocol: string;
            const host: string;
            const port: number;
            const pfx: any;
            const passphrase: string;
        }
        const ws: boolean;
        const secure: boolean;
        const xfwd: boolean;
        const toProxy: boolean;
        const prependPath: boolean;
        const ignorePath: boolean;
        const changeOrigin: boolean;
        const preserveHeaderKeyCase: boolean;
        const auth: string;
        const hostRewrite: boolean;
        const protocolRewrite: any;
        const cookieDomainRewrite: boolean;
        const cookiePathRewrite: boolean;
        const headers: {};
        const proxyTimeout: number;
        const timeout: number;
        const selfHandleResponse: boolean;
        const buffer: any;
        namespace ssl {
            const key: any;
            const cert: any;
        }
    }
    const listenPort: number;
    const stream: boolean;
    const modify: boolean;
    const runtime: boolean;
}
export namespace process {
    export const name: string;
    export const type: string;
    export const os: string;
    export const exe: string;
    export namespace cmds {
        namespace start {
            const usage: string;
            const args: any[];
        }
        namespace stop {
            const usage_1: string;
            export { usage_1 as usage };
            const args_1: any[];
            export { args_1 as args };
        }
        namespace restart {
            const usage_2: string;
            export { usage_2 as usage };
            const args_2: any[];
            export { args_2 as args };
        }
        namespace generic {
            const exe_1: string;
            export { exe_1 as exe };
            const usage_3: string;
            export { usage_3 as usage };
            const args_3: any[];
            export { args_3 as args };
        }
        namespace startbatwin32 {
            const exe_2: string;
            export { exe_2 as exe };
            const usage_4: string;
            export { usage_4 as usage };
            const args_4: any[];
            export { args_4 as args };
        }
        namespace stopbatwin32 {
            const exe_3: string;
            export { exe_3 as exe };
            const usage_5: string;
            export { usage_5 as usage };
            const args_5: any[];
            export { args_5 as args };
        }
        namespace startbatWindows_NT {
            const exe_4: string;
            export { exe_4 as exe };
            const usage_6: string;
            export { usage_6 as usage };
            const args_6: any[];
            export { args_6 as args };
        }
        namespace stopbatWindows_NT {
            const exe_5: string;
            export { exe_5 as exe };
            const usage_7: string;
            export { usage_7 as usage };
            const args_7: any[];
            export { args_7 as args };
        }
        namespace startbatlinux {
            const exe_6: string;
            export { exe_6 as exe };
            const usage_8: string;
            export { usage_8 as usage };
            const args_8: any[];
            export { args_8 as args };
        }
        namespace stopbatlinux {
            const exe_7: string;
            export { exe_7 as exe };
            const usage_9: string;
            export { usage_9 as usage };
            const args_9: any[];
            export { args_9 as args };
        }
        namespace startbatmac {
            const exe_8: string;
            export { exe_8 as exe };
            const usage_10: string;
            export { usage_10 as usage };
            const args_10: any[];
            export { args_10 as args };
        }
        namespace stopbatmac {
            const exe_9: string;
            export { exe_9 as exe };
            const usage_11: string;
            export { usage_11 as usage };
            const args_11: any[];
            export { args_11 as args };
        }
    }
    export namespace options_1 {
        const stdio: string;
        const shell: boolean;
    }
    export { options_1 as options };
    export namespace other {
        namespace paths {
            export const conf: string;
            const exe_10: string;
            export { exe_10 as exe };
        }
        const env: string;
        const setprocess: boolean;
        const executetype: string;
        const command: string;
    }
}
