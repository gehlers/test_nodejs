console.log('---------------------LOGGING STARTED------------------');

var express 	=    require('express')
    , http 		=    require('http')
    , passport 	=    require('passport')
    , path 		=    require('path')
    , User 		=    require('./models/User')
	, mysql 	= 	 require('mysql')
	, client 	= 	 mysql.createConnection({host:'localhost',user:'sa',password:'Pow3r!'})
	;

console.log('Server.js line 10');
var app = express();

var email = 'test@test.com';

//var usr = User.getAllUsers(email);

//console.log('printing "usr". see next line for value..');
//console.log(User.getAllUsers(email));

app.set('views', __dirname + '/app');
app.set('view engine', 'jade');
app.use(express.logger('dev'))
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.session(
    {
        secret: "Superdupersecret",
        cookie: { maxAge: 3600000 * 24 * 365 }
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.localStrategy); 
//console.log('###EXECUTING Server_passport.use(User.localStragegy)');
passport.serializeUser(User.serializeUser);
//console.log('###EXECUTING Server_passport.serializeUser(User.serializeUser)');
passport.deserializeUser(User.deserializeUser);
//console.log('###EXECUTING Server_passport.deserializeUser(User.deserializeUser)');

console.log('Server.js line 50');

/*
passport.use(User.LocalStrategy(
  function(user, password, done) {
    client.query("SELECT UserName, LastLoggedOn FROM Account WHERE UserName = ? AND Passcode = ?", [user, password], function(err, rows, fields) {
      if (err) throw err;
      // some other validation
	  else {
      // if everything is good to go
	  console.log(done(null,userObject));
      return done(null, userObject);
	  }
    })
  }
))
*/

console.log('Server.js line 68');

require('./routes.js')(app);

console.log('Server.js line 72');

app.set('port', process.env.PORT || 8000);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server is listening on port " + app.get('port'));
});