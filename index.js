var express = require('express');
var mongoose = require ("mongoose");

// database path, default: localhost
var mongoDbUri = 
  process.env.MONGODB_URI ||
  'mongodb://localhost,localhost:35046';

var githubAccessToken = 
  process.env.GITHUB_TOKEN;

var githubApiUrl =
  process.env.GITHUB_API ||
  'https://api.github.com/users/';

var users = [
    {
        name: 'Prabhanshu Attri',
        username: 'PrabhanshuAttri',
        avatar: 'https://avatars1.githubusercontent.com/u/4739486?v=3&s=460',
        link: {
            site: 'http://prabhanshu.com',
            github: 'http://prabhanshu.com/github',
            mail: 'contact@prabhanshu.com'
        },
        org: 'Nirmankarta, ForkSoceity',
        joined: '19th Jun 2013',
        located: 'Delhi, India'
    }
];

// The http server will listen to an appropriate port, or default to port 5000.
var port = process.env.PORT || 5000;

// Schema for each user
var userSchema = new mongoose.Schema({
    id: { type: String, trim: true }, 
    name: { type: String, trim: true },
    username: { type: String, lowercase: true, trim: true },
    avatar: { type: String, trim: true },
    isFemale: Boolean,
    link: {
        site: { type: String, trim: true },
        github: { type: String, trim: true },
        mail: { type: String, trim: true }
    },
    org: { type: String, trim: true },
    joined: { type: String, trim: true },
    located: { type: String, trim: true },
    updated: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'user' collection in the MongoDB database
var Jedi = mongoose.model('user', userSchema);

// Clear out old data
Jedi.remove({}, function(err) {
  if (err) {
    console.log ('error deleting old data.');
  }
});

var jedi_username = [
    'PrabhanshuAttri',
    'una',
    'daneden',
    'FatimaRafiqui'
];

jedi_username.forEach(function(u) {
    var completeURL = githubApiUrl + u + '?access_token=' + githubAccessToken;
    console.log(completeURL);
});

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(mongoDbUri, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + mongoDbUri + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + mongoDbUri);
  }
});


var app = express();
app.set('port', port);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index', {users: users});
});

app.get('/db', function(request, response) {
  response.render('pages/db');
});

app.get('/about', function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  createWebpage(request, response);
});



/*
// Creating one user.
var johndoe = new PUser ({
  name: { first: 'John', last: 'Doe' },
  age: 25
});

// Saving it to the database.  
johndoe.save(function (err) {if (err) console.log ('Error on save!')});
*/

// In case the browser connects before the database is connected, the
// user will see this message.
var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];

function createWebpage (request, response) {
    console.log('about page');
    // Let's find all the documents
  /*
  PUser.find({}).exec(function(err, result) {
    if (!err) { 
      response.write(html1 + JSON.stringify(result, undefined, 2) +  html2 + result.length + html3);
      // Let's see if there are any senior citizens (older than 64) with the last name Doe using the query constructor
      var query = PUser.find({'name.last': 'Doe'}); // (ok in this example, it's all entries)
      query.where('age').gt(64);
      query.exec(function(err, result) {
		if (!err) {
		  response.write(html4 + JSON.stringify(result, undefined, 2) + html5 + result.length + html6);
		} else {
		  response.write('Error in second query. ' + err)
		}
	      });
    } else {
      response.write('Error in first query. ' + err)
    };
  });*/
}

// Tell the console we're getting ready.
// The listener in http.createServer should still be active after these messages are emitted.
console.log('http server will be listening on port %d', port);
console.log('CTRL+C to exit');

//
// House keeping.

//
// The rudimentary HTML content in three pieces.
var html1 = '<title> hello-mongoose: MongoLab MongoDB Mongoose Node.js Demo on Heroku </title> \
<head> \
<style> body {color: #394a5f; font-family: sans-serif} </style> \
</head> \
<body> \
<h1> hello-mongoose: MongoLab MongoDB Mongoose Node.js Demo on Heroku </h1> \
See the <a href="https://devcenter.heroku.com/articles/nodejs-mongoose">supporting article on the Dev Center</a> to learn more about data modeling with Mongoose. \
<br\> \
<br\> \
<br\> <h2> All Documents in MonogoDB database </h2> <pre><code> ';
var html2 = '</code></pre> <br\> <i>';
var html3 = ' documents. </i> <br\> <br\>';
var html4 = '<h2> Queried (name.last = "Doe", age >64) Documents in MonogoDB database </h2> <pre><code> ';
var html5 = '</code></pre> <br\> <i>';
var html6 = ' documents. </i> <br\> <br\> \
<br\> <br\> <center><i> Demo code available at <a href="http://github.com/mongolab/hello-mongoose">github.com</a> </i></center>';


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});






