const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('GET /api/convert', function() {
    test('Convert a valid input: GET request to /api/convert', function(done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '10L' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.equal(res.body.returnNum, 2.64172);
          assert.equal(res.body.returnUnit, 'gal');
          assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
          done();
        });
    });
  });

  suite( 'GET /api/convert', function() {
    test('Convert an invalid input unit: GET request to /api/convert', function(done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '32g' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid unit");
          done();
        });
    });
  });

  suite( 'GET /api/convert', function() {
    test('Convert an invalid number: GET request to /api/convert', function(done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '3/7.2/4kg' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number");
          done();
        });
    });
  });

  suite( 'GET /api/convert', function() {
    test('Convert an invalid number AND unit: GET request to /api/convert', function(done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '3/7.2/4kilomegagram' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number and unit");
          done();
        });
    });
  });

  suite( 'GET /api/convert', function() {
    test('Convert with no number: GET request to /api/convert', function(done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: 'kg' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'kg');
          assert.equal(res.body.returnNum, 2.20462);
          assert.equal(res.body.returnUnit, 'lbs');
          assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
          done();
        });
    });
  });
});
