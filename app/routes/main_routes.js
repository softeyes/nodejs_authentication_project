// app/routes.js
function main_routes(app, passport) {

    // HOME PAGE (with login links) ========
    app.get('/', function (req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    var local_routes = require('./local_routes');
    local_routes(app, passport);

    var twitter_routes = require('./twitter_routes');
    twitter_routes(app, passport);

    var signup_routes = require('./signup_routes');
    signup_routes(app, passport);

    var profile_routes = require('./profile_routes');
    profile_routes(app, passport);

    var logout_routes = require('./logout_routes');
    logout_routes(app, passport);

    };
        // route middleware to ensure user is logged in
        function isLoggedIn(req, res, next) {
            if (req.isAuthenticated())
                return next();
    
            res.redirect('/');

};

module.exports = main_routes;