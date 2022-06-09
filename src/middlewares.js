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

let express = function (req, res, next) {

    next();
}

let koa = function (ctx, next) {

    next();
}

let nest = function (req, res, next) {

    next();
}

let loopback = function (ctx, next) {

    next();
}

let _meteor = function () {

}

let sails = function (req, res, next) {

    next();
}

let totaljs = function ($) {
    // https://docs.totaljs.com/total4/407ff001jy51c/#49a79001cp51c
    // NEWMIDDLEWARE(name, fn, [assign], [first]);
    // @name {String} The middleware name.
    // @fn {Function($)} important (can be null)
    // @assign {String/String Array} optional, assign middleware to ...
    // @first {Boolean} optional, adds priority before other middleware

    $.next();
}

let hapi = function (req, h) {
    // https://stackoverflow.com/questions/31331606/how-can-i-add-a-middleware-in-my-route
    // server.ext('onRequest', function);
    return h.continue;
}

let feather = function (ctx) {
    // https://docs.feathersjs.com/guides/basics/hooks.html

    return ctx;
}

let adonis = function (ctx, next) {
    // https://docs.adonisjs.com/guides/middleware

    next();
}

module.exports = {
    "file": { express, koa, nest, loopback, sails, totaljs, hapi, feather, adonis },
    "proxy": {}
}
