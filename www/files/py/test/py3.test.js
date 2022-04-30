/* eslint-env mocha */

const request = require('supertest');
const assert = require('chai').assert;
const express = require('express');
let cgijs = require("./src");
let cgi = cgijs.serve();
let py = path.join("www/py");

var app = express();

app.use('/', cgi.serve('py3', { web_files_root: py, bin_path: '/usr/bin/', config_path: '', host: shost, port: sport }));

describe('GET /', function() {
  it('should respond with /index.py', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          assert.match(res.body.$_SERVER.SCRIPT_FILENAME, /index.py$/);
        }
        done();
      });
  });
});

describe('Get /index.py', function() {
  it('should return a valid $_SERVER variable', function(done) {
    request(app)
      .get('/index.py')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          assert.match(res.body.$_SERVER.REMOTE_ADDR, /127.0.0.1|::1/);
        }
        done();
      });
  });
});
