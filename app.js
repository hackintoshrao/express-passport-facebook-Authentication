
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var config = require('./models/config.js'); //the configuration of the app for using FB Authentication

var User = require('./models/User.js'); //databse configurations 

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user,done){  //passports serialize method is used to maintain the session data 
  done(null,user.id);
});    

passport.deserializeUser(function(id,done){
  User.findOne({fbId:id},function(err,user){
    done(err,user);
  });

});

passport.use(new FacebookStrategy({   //Fb authentication details has to be provided and  callback is the URL to be redirected by Fb after successfull login
    clientID:config.development.fb.appId,
    clientSecret:config.development.fb.appSecret;
    callbackURL:config.developement.fb.url + 'fbauthed'
    },
    function(accessToken, refreshToken,profile, done){
      process.nextTick(function(){
        var query = User.findOne({'fbId:profile.id'}); //checking if the user is already registered in the database 
        query.exec(function(err,oldUser){
          if(oldUser){
            Console..log("User Exists" + oldUser.name + 'logged In!!');
            done(null,oldUser);
          }else {
            var newUser = new User(); //Else register the newUser 
            newUser.fbId = profile.id;
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value;
            newUser.save(function(err){
              if(err)
                throw err;
              console.log('New User registered');
              done(null,newUser);
            });
          }

        }); 
      });
    }
  )
);    
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({secret:'WeAtInterestshipDeveloptheCultureOfPeopleWorkingForTheirInterest'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/fbauth',passport.authenticate('facebook',{scope:'email'}));
app.get('/fbauthed',passport.authenticate('facebook',{failureRedirect:'/'}),routes.loggedin);
app.get('/logout',function(req,res){
  res.logOut();
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
