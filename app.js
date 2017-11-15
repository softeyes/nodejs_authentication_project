// app.js

// set up ======================================================================
// get all the tools we need
var passport = require('passport'); // use passport by requiring it
var express = require('express'); // use express by requiring it
var app = express(); // use express
var port = process.env.PORT || 3100; // designate a port
var mongoose = require('mongoose'); // use mongoose to object model our MongoDB database
mongoose.Promise = require('bluebird');
var flash = require('connect-flash'); // allows for passing session flashdata messages
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url, {
    useMongoClient: true
}); // connect to our database

// set up our express application by adding Middleware layers one by one in multiple invocations of use
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // get information from html forms

// required for passport 
app.use(session({secret: '<mysecret>', 
saveUninitialized: true,
resave: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('view engine', 'ejs'); // set up ejs for templating

require('./config/passport/main_passport')(passport); // pass passport for configuration

// routes ======================================================================
require('./app/routes/main_routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);