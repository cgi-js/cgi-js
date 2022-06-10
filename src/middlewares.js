/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 

TODO:
Add a middleware for proxy
Add a middleware for file
// References - https://www.simform.com/blog/best-nodejs-frameworks/

*/

const fileMod = require("./file");
const proxyMod = require("./process");

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let fmd_express = function (req, res, next) {

    next();
}

/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
let fmd_koa = function (ctx, next) {

    next();
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let fmd_nest = function (req, res, next) {

    next();
}

/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
let fmd_loopback = function (ctx, next) {

    next();
}

let _fmd_meteor = function () {

}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let fmd_sails = function (req, res, next) {

    next();
}

let fmd_totaljs = function ($) {
    // https://docs.totaljs.com/total4/407ff001jy51c/#49a79001cp51c
    // NEWMIDDLEWARE(name, fn, [assign], [first]);
    // @name {String} The middleware name.
    // @fn {Function($)} important (can be null)
    // @assign {String/String Array} optional, assign middleware to ...
    // @first {Boolean} optional, adds priority before other middleware

    $.next();
}

/**
 *
 *
 * @param {*} req
 * @param {*} h
 * @return {*} 
 */
let fmd_hapi = function (req, h) {
    // https://stackoverflow.com/questions/31331606/how-can-i-add-a-middleware-in-my-route
    // server.ext('onRequest', function);
    return h.continue;
}

/**
 *
 *
 * @param {*} ctx
 * @return {*} 
 */
let fmd_feather = function (ctx) {
    // https://docs.feathersjs.com/guides/basics/hooks.html

    return ctx;
}

/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
let fmd_adonis = function (ctx, next) {
    // https://docs.adonisjs.com/guides/middleware

    next();
}

let _fmd_fastify = function() {}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let pmd_express = function (req, res, next) {

    next();
}

/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
let pmd_koa = function (ctx, next) {

    next();
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let pmd_nest = function (req, res, next) {

    next();
}

/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
let pmd_loopback = function (ctx, next) {

    next();
}

let _pmd_meteor = function () {

}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let pmd_sails = function (req, res, next) {

    next();
}

/**
 *
 *
 * @param {*} $
 */
let pmd_totaljs = function ($) {

    $.next();
}

/**
 *
 *
 * @param {*} req
 * @param {*} h
 * @return {*} 
 */
let pmd_hapi = function (req, h) {

    return h.continue;
}

/**
 *
 *
 * @param {*} ctx
 * @return {*} 
 */
let pmd_feather = function (ctx) {

    return ctx;
}

/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
let pmd_adonis = function (ctx, next) {

    next();
}

let _pmd_fastify = function() {}

module.exports = {
    "file": { express: fmd_express, koa: fmd_koa, nest: fmd_nest, loopback: fmd_loopback, sails: fmd_sails, totaljs: fmd_totaljs, hapi: fmd_hapi, feather: fmd_feather, adonis: fmd_adonis },
    "proxy": { express: pmd_express, koa: pmd_koa, nest: pmd_nest, loopback: pmd_loopback, sails: pmd_sails, totaljs: pmd_totaljs, hapi: pmd_hapi, feather: pmd_feather, adonis: pmd_adonis }
}
