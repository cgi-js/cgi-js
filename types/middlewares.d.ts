/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
declare function fmd_express(req: any, res: any, next: any): void;
/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
declare function fmd_koa(ctx: any, next: any): void;
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
declare function fmd_nest(req: any, res: any, next: any): void;
/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
declare function fmd_loopback(ctx: any, next: any): void;
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
declare function fmd_sails(req: any, res: any, next: any): void;
declare function fmd_totaljs($: any): void;
/**
 *
 *
 * @param {*} req
 * @param {*} h
 * @return {*}
 */
declare function fmd_hapi(req: any, h: any): any;
/**
 *
 *
 * @param {*} ctx
 * @return {*}
 */
declare function fmd_feather(ctx: any): any;
/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
declare function fmd_adonis(ctx: any, next: any): void;
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
declare function pmd_express(req: any, res: any, next: any): void;
/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
declare function pmd_koa(ctx: any, next: any): void;
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
declare function pmd_nest(req: any, res: any, next: any): void;
/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
declare function pmd_loopback(ctx: any, next: any): void;
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
declare function pmd_sails(req: any, res: any, next: any): void;
/**
 *
 *
 * @param {*} $
 */
declare function pmd_totaljs($: any): void;
/**
 *
 *
 * @param {*} req
 * @param {*} h
 * @return {*}
 */
declare function pmd_hapi(req: any, h: any): any;
/**
 *
 *
 * @param {*} ctx
 * @return {*}
 */
declare function pmd_feather(ctx: any): any;
/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
declare function pmd_adonis(ctx: any, next: any): void;
export namespace file {
    export { fmd_express as express };
    export { fmd_koa as koa };
    export { fmd_nest as nest };
    export { fmd_loopback as loopback };
    export { fmd_sails as sails };
    export { fmd_totaljs as totaljs };
    export { fmd_hapi as hapi };
    export { fmd_feather as feather };
    export { fmd_adonis as adonis };
}
export namespace proxy {
    export { pmd_express as express };
    export { pmd_koa as koa };
    export { pmd_nest as nest };
    export { pmd_loopback as loopback };
    export { pmd_sails as sails };
    export { pmd_totaljs as totaljs };
    export { pmd_hapi as hapi };
    export { pmd_feather as feather };
    export { pmd_adonis as adonis };
}
export {};
