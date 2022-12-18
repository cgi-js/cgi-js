// /* eslint-env mocha */

// var request = require('supertest');
// var mocha = require('mocha');
// var describe = mocha.describe;
// var it = mocha.it;
// var assert = require('chai').assert;

// // const assert = require('assert');
// // var assert = require('chai').assert;
// // var describe = require('chai').describe;
// // var it = require('chai').it;

// var express = require('express');

// var app = express();
// var php = "../../../binaries/lang-php/win";
// var py = "../../../binaries/lang-python/win";
// var py3 = "../../../binaries/lang-python3/win";
// var rb = "../../../binaries/lang-ruby/win";
// var pl = "../../../binaries/lang-perl/win";
// var shost = "localhost";
// var sport = 3003;


// function response(type, exeOptions) {
//     const cgijs = require("../../../src");
//     // const cgijs = require("cgijs");
//     var cgi = cgijs.cgi();

//     return function (req, res, next) {
//         let requestObject = {
//             url: URL.parse(req.originalUrl),
//             originalUrl: req.originalUrl,
//             query: req.url.query,
//             method: req.method,
//             body: req.body,
//             ip: req.ip,
//             headers: req.headers
//         }
//         cgi.serve(type, requestObject, exeOptions).then(function (result) {
//             result.statusCode = (!result.statusCode) ? 200 : result.statusCode;
//             res.status(result.statusCode).send(result.response);
//         }.bind(res)).catch(function (e) {
//             e.statusCode = (!e.statusCode) ? 500 : e.statusCode;
//             res.status(e.statusCode).send(e.response);
//         });
//     };
// }

// // PHP File: Use bin as string
// app.use("/php", response('php', { web_root_folder: php, bin: '/usr/bin/', config_path: '', host: shost, port: sport, cmd_options: {} }));
// // PHP File: Use bin as object definition
// app.use("/phpud", response('php', { web_root_folder: php, bin: { bin_path: '', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// // PHP File: Use bin as Object definition with useDefault false
// app.use("/phpnud", response('php', { web_root_folder: php, bin: { bin_path: '/usr/bin/', useDefault: false }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// // RB File
// // app.use("/rb", response('rb', { web_root_folder: rby, bin: '/usr/bin/', config_path: '', host: shost, port: sport, cmd_options: {} }));
// // RB File
// // app.use("/rbud", response('rb', { web_root_folder: rby, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// // PLC File
// // app.use("/plc", response('plc', { web_root_folder: pl, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// // PLD File
// // app.use("/pld", response('pld', { web_root_folder: pl, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// // PL File
// // app.use("/pl", response('pl', { web_root_folder: pl, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// // PYTHON File
// app.use("/py", response('py', { web_root_folder: py, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));
// // PYTHON3 File
// app.use("/py3", response('py3', { web_root_folder: py, bin: { bin_path: '/usr/bin/', useDefault: true }, config_path: '', host: shost, port: sport, cmd_options: {} }));

// app.use("/", function (req, res) {
//     res.send(`
//         "Testing my server"
//     `);
// });

// app.listen(sport, shost, function () {

//     describe('GET /php', function () {
//         it('GET /php : should respond with /index.php', function (done) {
//             request(app)
//                 .get('/php')
//                 .set('Accept', 'application/json')
//                 // .expect('Content-Type', /json/)
//                 .expect(200)
//                 .end(function (err, res) {
//                     if (err) {
//                         done(err);
//                     } else {
//                         assert.match();
//                     }
//                 });
//         });
//     });

//     describe('Get /php/index.php', function () {
//         it('Get /php/index.php : should return a valid $_SERVER variable', function (done) {
//             request(app)
//                 .get('/php/index.php')
//                 .set('Accept', 'application/json')
//                 // .expect('Content-Type', /json/)
//                 .expect(200)
//                 .end(function (err, res) {
//                     if (err) {
//                         done(err);
//                     } else {
//                         assert.match();
//                     }
//                 });
//         });
//     });

//     describe('GET /phpud', function () {
//         it('GET /phpud : should respond with /phpud/index.php', function (done) {
//             request(app)
//                 .get('/phpud')
//                 .set('Accept', 'application/json')
//                 // .expect('Content-Type', /json/)
//                 .expect(200)
//                 .end(function (err, res) {
//                     if (err) {
//                         done(err);
//                     } else {
//                         assert.match();
//                     }
//                 });
//         });
//     });

//     describe('Get /phpud/index.php', function () {
//         it('Get /phpud/index.php : should return a valid $_SERVER variable', function (done) {
//             request(app)
//                 .get('/phpud/index.php')
//                 .set('Accept', 'application/json')
//                 // .expect('Content-Type', /json/)
//                 .expect(200)
//                 .end(function (err, res) {
//                     if (err) {
//                         done(err);
//                     } else {
//                         assert.match();
//                     }
//                 });
//         });
//     });

//     describe('GET /phpnud', function () {
//         it('GET /phpnud : should respond with /phpnud/index.php', function (done) {
//             request(app)
//                 .get('/phpnud')
//                 .set('Accept', 'application/json')
//                 // .expect('Content-Type', /json/)
//                 .expect(200)
//                 .end(function (err, res) {
//                     if (err) {
//                         done(err);
//                     } else {
//                         assert.match();
//                     }
//                 });
//         });
//     });

//     describe('Get /phpnud/index.php', function () {
//         it('Get /phpnud/index.php : should return a valid $_SERVER variable', function (done) {
//             request(app)
//                 .get('/phpnud/index.php')
//                 .set('Accept', 'application/json')
//                 // .expect('Content-Type', /json/)
//                 .expect(200)
//                 .end(function (err, res) {
//                     if (err) {
//                         done(err);
//                     } else {
//                         assert.match();
//                     }
//                 });
//         });
//     });

//     describe('GET /py', function () {
//         it('GET /py : should respond with /py/index.py', function (done) {
//             request(app)
//                 .get('/py')
//                 .set('Accept', 'application/json')
//                 // .expect('Content-Type', /json/)
//                 .expect(200)
//                 .end(function (err, res) {
//                     if (err) {
//                         done(err);
//                     } else {
//                         assert.match();
//                     }
//                 });
//         });
//     });

//     describe('Get /py/index.py', function () {
//         it('Get /py/index.py : should return a valid', function (done) {
//             request(app)
//                 .get('/py/index.py')
//                 .set('Accept', 'application/json')
//                 // .expect('Content-Type', /json/)
//                 .expect(200)
//                 .end(function (err, res) {
//                     if (err) {
//                         done(err);
//                     } else {
//                         assert.match();
//                     }
//                 });
//         });
//     });

//     describe('GET /py3', function () {
//         it('GET /py3 : should respond with /py3/index.py', function (done) {
//             request(app)
//                 .get('/py3')
//                 .set('Accept', 'application/json')
//                 // .expect('Content-Type', /json/)
//                 .expect(200)
//                 .end(function (err, res) {
//                     if (err) {
//                         done(err);
//                     } else {
//                         assert.match();
//                     }
//                 });
//         });
//     });

//     describe('Get /py3/index.py', function () {
//         it('Get /py3/index.py : should return a valid', function (done) {
//             request(app)
//                 .get('/py3/index.py')
//                 .set('Accept', 'application/json')
//                 // .expect('Content-Type', /json/)
//                 .expect(200)
//                 .end(function (err, res) {
//                     if (err) {
//                         done(err);
//                     } else {
//                         assert.match();
//                     }
//                 });
//         });
//     });

//     // describe('GET /pl', function () {
//     //     it('GET /pl : should respond with /pl/index.pl', function (done) {
//     //         request(app)
//     //             .get('/pl')
//     //             .set('Accept', 'application/json')
//     //             // .expect('Content-Type', /json/)
//     //             .expect(200)
//     //             .end(function (err, res) {
//     //                 if (err) {
//     //                     done(err);
//     //                 } else {
//     //                     assert.match();
//     //                 }
//     //             });
//     //     });
//     // });

//     // describe('Get /pl/index.pl', function () {
//     //     it('Get /pl/index.pl : should return a valid', function (done) {
//     //         request(app)
//     //             .get('/pl/index.pl')
//     //             .set('Accept', 'application/json')
//     //             // .expect('Content-Type', /json/)
//     //             .expect(200)
//     //             .end(function (err, res) {
//     //                 if (err) {
//     //                     done(err);
//     //                 } else {
//     //                     assert.match();
//     //                 }
//     //             });
//     //     });
//     // });

//     // describe('GET /plc', function () {
//     //     it('GET /plc : should respond with /plc/index.plc', function (done) {
//     //         request(app)
//     //             .get('/plc')
//     //             .set('Accept', 'application/json')
//     //             // .expect('Content-Type', /json/)
//     //             .expect(200)
//     //             .end(function (err, res) {
//     //                 if (err) {
//     //                     done(err);
//     //                 } else {
//     //                     assert.match();
//     //                 }
//     //             });
//     //     });
//     // });

//     // describe('Get /plc/index.plc', function () {
//     //     it('Get /plc/index.plc : should return a valid', function (done) {
//     //         request(app)
//     //             .get('/plc/index.plc')
//     //             .set('Accept', 'application/json')
//     //             // .expect('Content-Type', /json/)
//     //             .expect(200)
//     //             .end(function (err, res) {
//     //                 if (err) {
//     //                     done(err);
//     //                 } else {
//     //                     assert.match();
//     //                 }
//     //             });
//     //     });
//     // });

//     // describe('GET /pld', function () {
//     //     it('GET /pld : should respond with /pld/index.pld', function (done) {
//     //         request(app)
//     //             .get('/pld')
//     //             .set('Accept', 'application/json')
//     //             // .expect('Content-Type', /json/)
//     //             .expect(200)
//     //             .end(function (err, res) {
//     //                 if (err) {
//     //                     done(err);
//     //                 } else {
//     //                     assert.match();
//     //                 }
//     //             });
//     //     });
//     // });

//     // describe('Get /pld/index.pld', function () {
//     //     it('Get /pld/index.pld : should return a valid', function (done) {
//     //         request(app)
//     //             .get('/pld/index.pld')
//     //             .set('Accept', 'application/json')
//     //             // .expect('Content-Type', /json/)
//     //             .expect(200)
//     //             .end(function (err, res) {
//     //                 if (err) {
//     //                     done(err);
//     //                 } else {
//     //                     assert.match();
//     //                 }
//     //             });
//     //     });
//     // });

//     // describe('GET /rb', function () {
//     //     it('GET /rb : should respond with /rb/index.rb', function (done) {
//     //         request(app)
//     //             .get('/rb')
//     //             .set('Accept', 'application/json')
//     //             // .expect('Content-Type', /json/)
//     //             .expect(200)
//     //             .end(function (err, res) {
//     //                 if (err) {
//     //                     done(err);
//     //                 } else {
//     //                     assert.match();
//     //                 }
//     //             });
//     //     });
//     // });

//     // describe('Get /rb/index.rb', function () {
//     //     it('Get /rb/index.rb : should return a valid', function (done) {
//     //         request(app)
//     //             .get('/rb/index.rb')
//     //             .set('Accept', 'application/json')
//     //             // .expect('Content-Type', /json/)
//     //             .expect(200)
//     //             .end(function (err, res) {
//     //                 if (err) {
//     //                     done(err);
//     //                 } else {
//     //                     assert.match();
//     //                 }
//     //             });
//     //     });
//     // });

//     // describe('GET /rbud', function () {
//     //     it('GET /rbud : should respond with /rbud/index.rb', function (done) {
//     //         request(app)
//     //             .get('/rbud')
//     //             .set('Accept', 'application/json')
//     //             // .expect('Content-Type', /json/)
//     //             .expect(200)
//     //             .end(function (err, res) {
//     //                 if (err) {
//     //                     done(err);
//     //                 } else {
//     //                     assert.match();
//     //                 }
//     //             });
//     //     });
//     // });

//     // describe('Get /rbud/index.rb', function () {
//     //     it('Get /rbud/index.rb : should return a valid', function (done) {
//     //         request(app)
//     //             .get('/rbud/index.rb')
//     //             .set('Accept', 'application/json')
//     //             // .expect('Content-Type', /json/)
//     //             .expect(200)
//     //             .end(function (err, res) {
//     //                 if (err) {
//     //                     done(err);
//     //                 } else {
//     //                     assert.match();
//     //                 }
//     //             });
//     //     });
//     // });

// });

