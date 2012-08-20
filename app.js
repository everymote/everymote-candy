var io = require('socket.io-client'),
   tellstick = require('./candy');

var port = '1337',
	server =  '127.0.0.1';


var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1338, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1338/');

var connectCandy = function(thing){
	console.log(thing);
	var socket = io.connect('http://' + server + ':' + port + '/thing'
		,{"force new connection":true
		  ,'reconnect': true
  		  ,'reconnection delay': 5000
  		  ,'reconnection limit': 5000
  		  ,'max reconnection attempts': 10 });
	
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
	}).on('reconnect', function () {
		console.log('reconnect');
	}).on('reconnecting', function () {
		console.log('reconnecting');
	}).on('reconnect_failed', function () {
		console.log('reconnect_failed');
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
