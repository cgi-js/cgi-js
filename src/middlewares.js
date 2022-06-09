/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
     CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 

TODO:
Add a middleware for proxy
Add a middleware for 
// References - https://www.simform.com/blog/best-nodejs-frameworks/
*/

const fileMod = require("./file");

let md_express = function (req, res, next) {

    next();
}

let md_koa = function (ctx, next) {

    next();
}

let md_nest = function (req, res, next) {

    next();
}

let md_loopback = function (ctx, next) {

    next();
}

let _md_meteor = function () {

}

let md_sails = function (req, res, next) {

    next();
}

let md_totaljs = function ($) {
    // https://docs.totaljs.com/total4/407ff001jy51c/#49a79001cp51c
    // NEWMIDDLEWARE(name, fn, [assign], [first]);
    // @name {String} The middleware name.
    // @fn {Function($)} important (can be null)
    // @assign {String/String Array} optional, assign middleware to ...
    // @first {Boolean} optional, adds priority before other middleware

    $.next();
}

let md_hapi = function (req, h) {
    // https://stackoverflow.com/questions/31331606/how-can-i-add-a-middleware-in-my-route
    // server.ext('onRequest', function);
    return h.continue;
}

let md_feather = function (ctx) {
    // https://docs.feathersjs.com/guides/basics/hooks.html

    return ctx;
}

let md_adonis = function (ctx, next) {
    // https://docs.adonisjs.com/guides/middleware

    next();
}

module.exports = {
    "file": { express: md_express, koa: md_koa, nest: md_nest, loopback: md_loopback, sails: md_sails, totaljs: md_totaljs, hapi: md_hapi, feather: md_feather, adonis: md_adonis },
    "proxy": {}
}
