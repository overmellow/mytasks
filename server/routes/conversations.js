var express = require('express');
var router = express.Router();

var Conversation = require('../models/conversation');

router
// get specific task specified by taskId
.get('/messages/:conversationId', function(req, res) {
  Conversation.findById(req.params.conversationId).exec(function(err, conversation){
    if(conversation != null && conversation != undefined){
      res.json(conversation.messages);  
    }
  })
})

module.exports = router;
