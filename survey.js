// grab the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());

var port = process.env.PORT || 8080;

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
	cookie: { secure: false }
/*     store: new MongoStore({
        url: 'mongodb://localhost/test-app',
        touchAfter: 24 * 3600 // time period in seconds
    }) */
  
}))

// Access the session as req.session
app.get('/api/session', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

// routes will go here
app.get('/api/users', function(req, res) {
  var user_id = req.query.id;
  var token = req.query.token;
  var geo = req.query.geo;  

  res.send(user_id + ' ' + token + ' ' + geo);
});

// http://localhost:8080/api/token
app.get('/api/token', function(req, res) {
	  // check if client sent cookie
	  var cookie = req.cookies.token;
	  if (cookie === undefined)
	  {
		// no: set a new cookie
		var randomNumber=Math.random().toString();
		randomNumber=randomNumber.substring(2,randomNumber.length);
		res.cookie('token',randomNumber, { maxAge: 900000, httpOnly: true });
		console.log('cookie created successfully');
		res.send({token:randomNumber});
	  } 
	  else
	  {
		// yes, cookie was already present 
		console.log('cookie exists', cookie);
		res.send({token:cookie});
	  } 
	  
});

  // parameter middleware that will run before the next routes
app.param('name', function(req, res, next, name) {

    // check if the user with that name exists
    // do some validations
    // add -dude to the name
    var modified = name + '-dude';

    // save name to the request
    req.name = modified;

    next();
});

// http://localhost:8080/api/users/chris
app.get('/api/users/:name', function(req, res) {
    // the user was found and is available in req.user
    res.send('What is up ' + req.name + '!');
});

// POST http://localhost:8080/api/users
// parameters sent with 
app.post('/api/token', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + ' ' + token + ' ' + geo);
});
  
 
// let static middleware do its job
app.use(express.static(__dirname + '/public'));
console.log('Serving public content on: ' + __dirname + '/public');
 
// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);