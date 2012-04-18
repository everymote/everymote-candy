var io = require('socket.io-client'),
   tellstick = require('./candy');

var port = '1337',
	server =  'm.everymote.com';


var connectCandy = function(thing){
	console.log(thing);
	var socket = io.connect('http://' + server + ':' + port + '/thing',{"force new connection":true});
	
	socket.on('connect', function () {
		console.log('connected');
		socket.emit('setup', thing);
	}).on('doAction', function (action) {
		console.log(action);
		if(action == "Candy please!"){
			tellstick.relese(thing);			
		}else if(action== "One"){
			tellstick.relese(thing);		
		}else if(action== "Two"){
			tellstick.relese(thing);		
		}

	}).on('connect_failed', function () {
		console.log('error:' + socket );
	}).on('disconnect', function () {
		console.log('disconnected');
	});
};

var connectThings = function (things){
	things.map(connectCandy);
};	

tellstick.getThings(connectThings);


process.on('uncaughtException', function(err){
	console.log('Something bad happened: ' + err);
	process.exit(0);
});
