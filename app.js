
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs= require('fs');
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
  passport.authenticate('facebook', { scope: ['read_stream','user_groups','read_mailbox'] })
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

 var i = 1; //counter to see the number of requests made
app.get('/feeds',function(req,res){
     
	res.send("Please see the terminal for the progress");
		function allFeeds(URL){


			request({uri : URL,
						 
					 timeout : 15000,
					  method : "GET"
		     },

function(err,response,body)
{
	if(!err){ 
		
		console.log("REQUEST NUMBER :"+ i);
		++i;
		if(JSON.parse(body).data[0]==null){ console.log("Congratulations !!! , you have successfully scraped the group ");
		return;}
		console.log(JSON.parse(body).paging.next);
		fs.appendFile('feeds.json',JSON.stringify(JSON.parse(body)) , function (err) {

});
    if(i%10==0) setTimeout(function(){allFeeds(JSON.parse(body).paging.next);},5000);
	else 
	allFeeds(JSON.parse(body).paging.next);
} 
else console.log(err);
	
   });
		
			
}

allFeeds( "https://graph.facebook.com/125499867491756/feed/?access_token="+req.user.token);
	
	
	});

app.get('/members',function(req,res){
	
		res.send("Please see the terminal for the progress");
		function allMembers(URL){


			request({uri : URL,
						 
					 timeout : 15000,
					  method : "GET"
		     },

function(err,response,body)
{
	if(!err){ 
		
		console.log("REQUEST NUMBER :"+ i);
		++i;
		if(JSON.parse(body).data[0]==null){ console.log("Congratulations !!! , you have successfully scraped all the members ");
		return;}
		console.log(JSON.parse(body).paging.next);
		fs.appendFile('members.json',JSON.stringify(JSON.parse(body)) , function (err) {

});
		
	allMembers(JSON.parse(body).paging.next);
} 
else console.log(err);
	
   });
		
			
}

allMembers( "https://graph.facebook.com/125499867491756/members/?access_token="+req.user.token);
	

	
	
	});

app.get('/inbox',function(req,res){
	
		res.send("Please see the terminal for the progress");
		function allMessages(URL){


			request({uri : URL,
						 
					 timeout : 15000,
					  method : "GET"
		     },

function(err,response,body)
{
	if(!err){ 
		
		console.log("REQUEST NUMBER :"+ i);
		++i;
		console.log(JSON.parse(body).paging);
		if(JSON.parse(body).data[0]==null){ console.log("Congratulations !!! , you have successfully scraped all the messages ");
		return;}
		console.log(JSON.parse(body).paging.next);
		fs.appendFile('messages.json',JSON.stringify(JSON.parse(body)) , function (err) {

});
		
if(i%6==0){ console.log("====================WAIT for another 8 minutes for the next request===========================");
	setTimeout(function(){allMessages(JSON.parse(body).paging.next);},8*60*1000);
}
	else 
	allMessages(JSON.parse(body).paging.next);
} 
else console.log(err);
	
   });
		
			
}

allMessages( "https://graph.facebook.com/me/inbox/?limit=50&access_token="+req.user.token);
	

	
	
	});
app.listen( process.env.PORT || 3000);
