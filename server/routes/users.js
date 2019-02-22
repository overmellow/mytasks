var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})

.put('/updateprofile', function(req, res){
  User.findById(req.decoded._doc._id).exec(function(err, user){
    user.name = req.body.name;
    user.password = req.body.password;
    user.save(function(err, todo){
      res.json({ success: true });
    })    
  })
})

module.exports = router;
