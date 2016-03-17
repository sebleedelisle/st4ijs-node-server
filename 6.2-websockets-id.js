express = require('express'); 
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);	

server.listen(8102); //start the webserver on port 8101
app.use(express.static('6.2-public')); //tell the server that ./public/ contains the static webpages

io.sockets.on('connection', function (socket) { //gets called whenever a client connects
	
	
	console.log('connected '); 

	// if we get a message of type 'led' then... 
	socket.on('led', function (data) { 
	
		// send the led message out to all other clients in the same room
		for(var room in socket.rooms){
			if(room!=socket.id) io.sockets.to(room).emit('led', {value: data.value}); 
		}
		
	});
	socket.on('message', function (data) { 
		// send the  message out to all other clients in the same room
		for(var room in socket.rooms) { 
			if(room!=socket.id) io.sockets.to(room).emit('message', {value: data.value}); 
		}
	});
	// clients can join their own room by sending a 'joinroom' message
	// with the name of the room in. 
	socket.on('joinroom', function (data) { 
		socket.join(data.value);
	});
});
