import request from 'supertest';
import chai from 'chai';
import session from 'supertest-session';
import { app } from '../server';

var expect = chai.expect;

describe('Bill Collection Tests', function() {
  var agent = request.agent(app);
  var testSession;

  beforeEach(function() {
    testSession = session(app);
  });

  describe('Post', function() {
    it('should respond to users with 201 status code', function(done) {
      agent
        .post('/bills')
        .send({userID: '58896f88d975771793e866bb', total: 39.10, people: [], info: ''})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.text).to.equal('Bill saved');
          done();
        });
    });
  });
  describe('Get Own Bills', function() {
    it('should respond to users with an array of their bills', function(done) {
      agent
        .get('/bills')
        .send({userID: '58896f88d975771793e866bb'})
        .end(function(err, res) {
          done();
        });
    });
  });
});

xdescribe('Authentication Test', function() {
  var agent = request.agent(app);
  var testSession;

  beforeEach(function() {
    testSession = session(app);
  });

  describe('Login', function() {
    it('testSession should sign in', function(done) {
      testSession.post('/auth/login')
        .send({ username: 'tom', password: 'tom' })
        .expect(302)
        .end(done);
    });

    it('returns a status code of 302 for redirect', function(done) {
      agent
        .post('/auth/login')
        .send({ username: 'tom', password: 'tom' })
        .end(function(err, res) {
          expect(res.statusCode).to.equal(302);
          expect(res.headers['set-cookie']).to.not.equal([]);
          expect(res.headers['set-cookie']).to.not.equal(undefined);
          done();
        });
    });
    
    it('get request to login returns a status code of 404', function(done) {
      agent
        .get('/auth/login')
        .end(function(err, res) {
          expect(res.statusCode).to.deep.equal(404);
          done();
        });
    });
  });

  describe('Logout', function() {
    var authenticatedSession;

    beforeEach(function(done) {
      testSession.post('/auth/login')
        .send({ username: 'tom', password: 'tom' })
        .expect(302)
        .end(function(err) {
          if (err) return done(err);

          authenticatedSession = testSession;
          return done();
        });
    });
    

    it('destroys the session on logout', function(done) {
      var sessionCookie = testSession.cookies.find(cookie => cookie.name === 'connect.sid');
      expect(sessionCookie).to.not.equal(undefined);
      expect(sessionCookie).to.not.equal(null);

      testSession.post('/auth/logout') 
        .send()
        .expect(302)
        .end(function(err) {
          sessionCookie = testSession.cookies.find(cookie => cookie.name === 'connect.sid');
          expect(sessionCookie).to.equal(undefined);
          done();
        });
    });
  });

  describe('Register', function() {
    it('should respond to existing users with 409 status code', function(done) {
      agent
        .post('/auth/register')
        .send({ username: 'gret', password: 'kjejje' })
        .end(function(err, res) {
          expect(res.statusCode).to.equal(409);
          expect(res.text).to.equal('user exists');
          done();
        });
    });
  });
});
