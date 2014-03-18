/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

 var passport = require('passport')
  , util = require('util')
  , FacebookStrategy = require('passport-facebook').Strategy;
  

var app = express();

 //request
  var request = require('request');



var FACEBOOK_APP_ID = "1483062015250550";
var FACEBOOK_APP_SECRET = 'e6c53e9c7581c33d293331b489113b6d';



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    // asynchronous verification, for effect...
    process.nextTick(function () {
     profile.token = accessToken;
    
      return done(null, profile);
    });
  }
));




//configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
	res.render('index',{user: req.user});
	
}	);

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['read_stream','user_groups'] })
);
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
	  setTimeout(function(){
    res.redirect('/');},2000);
  });
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.get('/feeds',function(req,res){
	
		
		console.log(req.user);
		
			request({uri : "https://graph.facebook.com/125499867491756/feed/?access_token="+req.user.token,
						 
					 timeout : 15000,
					  method : "GET"
		     },

function(err,response,body)
{
	if(!err){ console.log(body);
	
	res.send(body)
} 
else console.log(err);
	
   });
		
			

	
	
	});

app.get('/members',function(req,res){
	
		
		console.log(req.user);
		
			request({uri : "https://graph.facebook.com/125499867491756/members/?access_token="+req.user.token,
						 
					 timeout : 15000,
					  method : "GET"
		     },

function(err,response,body)
{
	if(!err){ console.log(body);
	res.send(body);
} 
else console.log(err);
	
   });
		
			

	
	
	});
app.listen( process.env.PORT || 3000);
