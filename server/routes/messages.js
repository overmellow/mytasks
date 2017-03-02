var express = require('express');
var router = express.Router();
var io = require('socket.io')();
var config = require('../config');

var socketioJwt = require('socketio-jwt');



router.get('/', function(req, res, next) {
	//// With socket.io < 1.0 ////
	io.use(socketioJwt.authorize({
	  secret: config.secret,
	  handshake: true
	}));

	io
	.on('connection', function(socket){
		console.log('connected!');
	})

//	io.emit('chat message', msg.message);

});

/* GET home page. */
/*router.get('/', function(req, res, next) {
  io
	.on('connection', function(socket){
	  socket.on('chat message', function(msg){
	    console.log('message: ' + msg.message);
	  //socket.broadcast.emit('chat message', msg);
	  });	
	});
});
*/
module.exports = router;