
//routes is the controller for the app, defining the routing for the website


//initialize mongoDB read & push
var db = require('../models/mongodb');
var User = require('../models/user');

function initapp (app) {
	app.get('/', getHome);
	app.get('/register', getRegister);
	app.get('/login',getLogin);
	app.get('/test', getTest);
	app.post('/test', postTest);
	app.post('/api/spotify/search', spotifySearch);
	app.post('/api/user/register', registerUser);
}

function spotifySearch(req, res){
console.log(req.body);
     var req_obj = req.body;
     var SpotifyWebApi = require('spotify-web-api-node');

	// credentials are optional
     var spotifyApi = new SpotifyWebApi();

spotifyApi.searchTracks(req_obj.searchQuery)
  .then(function(data) {
    res.json(data.body);
  }, function(err) {
	res.json('error');
  });

}

function registerUser(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	
	var newUser = new User({
		name: name,
		email: email,
		username: username,
		password: password
	});
	
	User.createUser(newUser, function(err, user){
		if(err) throw err;
		console.log(user);
		
		// Redirect Somewhere, not sure where yet
		res.redirect('/');
	});
};

function getLogin(req, res){
	res.render("login.ejs");
}

function getRegister(req, res){
	res.render("register.ejs");
}

function getHome(req, res) {
	res.render("index.ejs")
}

function getTest(req, res) {
	db.read('test', function(err,results){
		if(!err){
			res.render('test.ejs', {results: results})
		}
	})
}

function postTest(req, res) {
	db.write('test',req.body, function (err,results) {
		if (!err) {
			res.redirect('/')
		}
	})
}

module.exports = initapp