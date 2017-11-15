// config/passport/passport.js

// load up the user model
var User = require('../../app/models/user');

// load the auth variables
var configAuth = require('../auth');

// expose this function to our app using module.exports
module.exports = function (passport) {

    // PASSPORT SESSION SETUP ==================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

        var local_login_passport = require('./local_login_passport');
        local_login_passport(passport);

        var local_signup_passport = require('./local_signup_passport');
        local_signup_passport(passport);

        var twitter_passport = require('./twitter_passport');
        twitter_passport(passport);

};