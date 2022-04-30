/* eslint-env mocha */

var request = require('supertest');
var assert = require('chai').assert;
var express = require('express');
var php = require('../../../src/').init();

var app = express();

app.use('/', php.serve(__dirname + '/php'));

describe('GET /', function() {
  it('GET / : should respond with /index.php', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          assert.match(res.body.$_SERVER.SCRIPT_FILENAME, /index.php$/);
        }
        // done();
      });
  });
});

describe('Get /index.php', function() {
  it('Get /index.php : should return a valid $_SERVER variable', function(done) {
    request(app)
      .get('/index.php')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          assert.match(res.body.$_SERVER.REMOTE_ADDR, /127.0.0.1|::1/);
        }
        // done();
      });
  });
});

// describe('Get /index.php', function() {
//   it('Get /index.php : should return a valid $_SERVER variable', function(done) {
    
//   });
// });

