var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  /*var io = req.app.get('socketio');
  io.emit('hi!');*/
  //res.send('respond with a resource');

  	  var chats = [{
	    id: 0,
	    name: 'Ben Sparrow',
	    lastText: 'What`s up dog?',
	    face: 'img/ben.png'
	  }, {
	    id: 1,
	    name: 'Max Lynx',
	    lastText: 'Hey, it\'s me',
	    face: 'img/max.png'
	  }, {
	    id: 2,
	    name: 'Adam Bradleyson',
	    lastText: 'I should buy a boat',
	    face: 'img/adam.jpg'
	  }, {
	    id: 3,
	    name: 'Perry Governor',
	    lastText: 'Look at my mukluks!',
	    face: 'img/perry.png'
	  }, {
	    id: 4,
	    name: 'Mike Harrington',
	    lastText: 'This is wicked good ice cream.',
	    face: 'img/mike.png'
  }];

  res.json(chats);
});

module.exports = router;
