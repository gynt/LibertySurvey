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

// parameter middleware that will run before the next routes
app.param('surveyid', function(req, res, next, surveyid) {

  // check if the surveyid exists
  if(surveyid=="12345") {
    // save name to the request
    req.surveyid = surveyid;
  }

  next();
});

app.get('/survey/:surveyid', function(req, res) {
  if(req.surveyid) {
    res.send("Welcome to this survey with ID: " + req.surveyid);
  } else {
    res.status(404).send('survey does not exist');
  }  
});

app.get('/survey/:surveyid/admin', function(req, res) {
  if(req.surveyid) {
    res.send("Please login to edit survey with ID: " + req.surveyid);
  } else {
    res.status(404).send('survey does not exist');
  }
});
  
 
// let static middleware do its job
app.use(express.static(__dirname + '/public'));
console.log('Serving public content on: ' + __dirname + '/public');


var survey = require("./survey-poc/poc.js");
console.log(survey.sections[0].elements[2]);
console.log(survey.sections[0].elements[3]);
console.log(survey.sections);

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);