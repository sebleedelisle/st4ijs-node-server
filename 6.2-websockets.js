express = require('express');  //web server
app = express();

server = require('http').createServer(app);
io = require('socket.io').listen(server);	//web socket server

server.listen(8101); //start the webserver on port 8101
app.use(express.static('6.1-public')); //tell the server that ./public/ contains the static webpages

var ledOn = false; 
var connections = [];

io.sockets.on('connection', function (socket) { //gets called whenever a client connects
	socket.emit('led', {value: ledOn}); //send the new client the current state
	
	socket.on('led', function (data) { //makes the socket react to 'led' packets by calling this function
		ledOn = data.value;  //updates brightness from the data object
		console.log(data); 
	

		console.log(ledOn); 
		io.sockets.emit('led', {value: data.value}); //sends the updated brightness to all connected clients
	});
});
