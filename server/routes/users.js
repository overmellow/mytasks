var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  /*var io = req.app.get('socketio');
  io.emit('hi!');*/
  res.send('respond with a resource');
});

module.exports = router;
