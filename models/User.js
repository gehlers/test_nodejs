var User
	, _ 			= require('underscore')
	, passport 		= require('passport')
	, LocalStrategy = require('passport-local').Strategy
	, mysql 		= require('mysql')
	, client 		= mysql.createConnection({host:'localhost',user:'sa',password:'Pow3r!'})
 ;

//var sqlGetUsers	= 'SELECT Id AS id,UserName AS username,PassCode AS password,UserRoleId AS userRole FROM User.Account;';

var email = 'test@test.com';

/*
var myObject = {
	a_variable_proxy : (function(){ var myvariable = 1; return myvariable })()
};
console.log(myObject);

var dbusers = {
	//console.log('executing User_getUsers()');

	//client.query("SELECT * FROM User.Account WHERE Email=?",[email],function selectCb(err, details, fields) {
	ds_proxy : (function(){
		
		client.query("SELECT Id AS id,UserName AS username,PassCode AS password,UserRoleId AS userRole FROM User.Account;",[],function selectCb(err, recordset, fields) {
		if (err) {
		  console.log(err);
		}
		else {
		console.log(recordset);
		var ds = recordset;
		return ds ;
		console.log(ds);
		//res.send(recordset);		
		}
	})})()
};

//dbusers = GetUsers(sqlGetUsers);

console.log(dbusers);
*/

//this is just testing data for now
var users = [{
        id: 1,
        username: "user",
        password: "123",
        userRole: 2
    }, {
        id: 2,
        username: "admin",
        password: "123",
        userRole: 4
    }
];
 
console.log('Users.js variable declaration complete');

function getAllUsers() {
  console.log('###EXECUTING Server.getAllUsers');

  client.query("SELECT Id AS id,UserName AS username,PassCode AS password,UserRoleId AS userRole FROM User.Account;",[],function selectCb(err, details, fields) {
    if (err) {
		console.log(err);
    }
	else {
	console.log(details);
	
	return(details);
    //res.send(details);
	}
  });
};



//console.log('printing usr value');
getAllUsers();
//console.log(getAllUsers());
//console.log(usr);
 
function addUser(username, password) {
    console.log('###EXECUTING addUser');
    var user = {
        id: _.max(_.pluck(users, 'id')) + 1,
        username: username,
        password: password,
        userRole: 2
    };
    //console.log(user);
    users.push(user);
 
    return user;
};
 
//console.log('Users.js line 36 pre findById');
 
function findById(id) {
    console.log('###EXECUTING User_findById');
    console.log(_.contains(_.pluck(users, 'id'), id));
	console.log(id);
    
    console.log(_.contains(_.pluck(users, 'id'), username));
	if(_.contains(_.pluck(users, 'id'), username)){
		console.log('id found');
		return(id);
	}
	else {
		console.log('id not found'); 
		return(_.contains(_.pluck(users, 'id'), id));
	}
    // return _.find(users, function(user) { return user.id === id }); // this was the orig code
};
 
function validateUsernameExists(username) {
	console.log('###EXECUTING User_findByUsername');
	console.log('printing username value to console. see next line for value...');
	console.log(username);
    
    console.log(_.contains(_.pluck(users, 'username'), username));
	if(_.contains(_.pluck(users, 'username'), username)){
		return(username);
	}
	else {
		return(_.contains(_.pluck(users, 'username'), username));
	}
    //return _.find(users, function(user) { return user.username === username; });// this was the orig code
};

function isPasswordValid(username, password) {
	console.log('###EXECUTING User_findPasswordByUsername');
	console.log('printing username value to console. see next line...');
	console.log(username);
    console.log(_.findWhere(users, {username: username})); 
	var ob = [_.findWhere(users, {username: username})]; 
	console.log('printing ob value. see next line for value...');
	console.log(ob); 
    console.log(_.contains(_.pluck(ob, 'password'), password));
	
	return(_.contains(_.pluck(ob, 'password'), password));
};
 

 
//console.log(localStrategy);
var localStrategy = new LocalStrategy(function (username, password, done) {

console.log('###EXECUTING User_localStrategy');

    var user = validateUsernameExists(username);
	//isPasswordValid(username, password);
 
    if (!user) {
		console.log('Incorrect username')
        done(null, false, {	
            message: 'Incorrect username.'
        });
    } else if (!isPasswordValid(username, password)) {
        console.log('Incorrect password ');
		done(null, false, {			
            message: 'Incorrect password.'
        });
    } else {
		console.log('logging (done) value. see next line for value...'); 
		console.log(done);
		console.log('logging (user) value. see next line for value...'); 
		console.log(user); 
		console.log(done(null, user)); 
        return done(null, user);
    }
})
//console.log(localStrategy);

 function serializeUser(user, done) {
    console.log('###EXECUTING User_serializeUser');
	console.log('printing user value to console. see next line for value...');
	console.log(user);
	console.log('printing done value to console. see next line for value...');
	console.log(done);	
	
    console.log(user.id);
    done(null, user.id);
};
 
function deserializeUser(id, done) {
    console.log('###EXECUTING User_deserializeUser');
	console.log('printing id value to console. see next line for value...');
	console.log(id);
	console.log('printing done value to console. see next line for value...');
	console.log(done);	
    var user = findById(id);
    if (user) {
        done(null, user);
    } else {
        done({
            message: 'User not found'
        }, null);
    }
};

console.log('pre module.exports execution');
 
module.exports = {
    addUser: addUser,
    findById: findById,
	//getAllUsers: getAllUsers,
    validateUsernameExists: validateUsernameExists,
    localStrategy: localStrategy,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser
}
