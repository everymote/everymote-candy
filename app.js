var io = require('socket.io-client'),
   candy = require('./candy');

var port = '80',
	server =  'thing.everymote.com';



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
		if(action.id  == "1"){
			candy.relese(thing);			
		}else if(action.id == "2"){
			candy.relese(thing);
			candy.relese(thing);		
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

candy.getThings(connectThings);
console.log("end");

process.on('uncaughtException', function(err){
	console.log('Something bad happened: ' + err);
	process.exit(0);
});
