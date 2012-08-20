var exec = require('child_process').exec,
	config = require('./config'),
	net = require('net');
var _things = [];
	
var createThing = function(){
	return { 
		"name": 'Candy machine',
		"id": 3432,
		"iconType": "candy",
		//"position": config.getPosition(),
		"quickAction":{"type":"button", "name":"Candy please!", "id":"1"},
		"actionControles": [
                {"type":"button", "name":"One", "id":"1"},
                {"type":"button", "name":"Two", "id":"2"}
            ]
	};	
};


exports.relese = function(thing){ 
	var client = net.connect({port: 50000},
    	function() { 
  			console.log('client connected');
  
		}).
		on('error', function (error) {
			    console.log("error connecting to tellnetserver");
	    		console.log(error);
	  	}).
		on("connection", function (socket) {
	 		socket.on("data", function (data) {
	    		console.log(data);
	  		});
	  		socket.on("end", function () {
	    
	  	});
	 
	});	
};

exports.getThings = function(callback){

	   _things.push(createThing());
		

	  callback(_things);
	};	

