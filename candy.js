var exec = require('child_process').exec,
	config = require('./config');
var _things = [];
	
var createThing = function(){
	return { 
		"name": 'Candy machine',
		"id": 3432,
		"position": config.getPosition(),
		"quickAction":{"button":"Candy please!"},
		"functions":[{"button":"One"}, {"button":"Two"}]
	};	
};


exports.relese = function(thing){ exec("telnet 127.0.0.1 5000 ", function (error, stdout, stderr) {
	  console.log('stdout: ' + stdout);
	  console.log('stderr: ' + stderr);
	  if (error !== null) {
	    console.log('exec error: ' + error);
	  }
	});
};

exports.getThings = function(callback){

	   _things.push(createThing());
		

	  callback(_things);
	};	

