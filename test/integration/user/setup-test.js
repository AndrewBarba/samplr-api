/**
 * Created by manikandan on 3/22/16.
 */


"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');

describe('Integration', () => {
    describe('User', () => {
    describe('Me', () => {

        let auth;

    let adminData = {
        email: `admin@gmail.com`,
        password: "abc123",
        firstName: "Mani",
        lastName: "Admin",
        type: "RESEARCHER",
        age: 25
    };

    let clientData = {
        email: `client@gmail.com`,
        password: "abc123",
        firstName: "Mani",
        lastName: "Client",
        age: 25
    };

    // Register admin
    before(done => {
        Auth.register(adminData, (err, _auth) => {
        if (err) return done(err);
    auth = _auth;
    done();
});
});

        it('setup-test-register', done => {
            agent
                .client()
                .post('/auth/register/client')
                .query({
                    auth: auth.token
                })
                .send(clientData)
                .expect(201)
                .end(function(err, result) {
                    should.not.exist(err);
                    let auth = result.body;
                    should.exist(auth);
                    should.exist(auth.token);
                    should.not.exist(auth.password);
                    should.exist(auth.user);
                    auth.user.email.should.equal(clientData.email);
                    auth.user.firstName.should.equal(clientData.firstName);
                    auth.user.lastName.should.equal(clientData.lastName);
                    auth.user.age.should.equal(clientData.age);
                    auth.user.type.should.equal("CLIENT");
                    done();
                });
        });
});
});
});
