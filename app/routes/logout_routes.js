// LOGOUT ==============================

function logout_routes(app, passport) {

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // route for logging out
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // route middleware to ensure user is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    };
};

    module.exports = logout_routes;