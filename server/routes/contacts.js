var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Conversation = require('../models/conversation');

router
// get all contacts
.get('/', function(req, res) {
  User.find().exec(function(err, users){
    users = users.filter(function(el){ return el._id != req.decoded._doc._id; });
    res.json(users);  
  })
})

// get specific contacts of specified user by userId
.get('/mycontacts', function(req, res) {
  User.findById(req.decoded._doc._id)
  .populate({path: 'contacts.contactee'})
  .exec(function(err, user){
	  if (err) return handleError(err);
    //console.log
  	res.json(user.contacts);
  })
})

// get specific contacts of specified user by userId
.get('/mycontacts/:conversationId', function(req, res) {
  Conversation.findById(req.params.conversationId)
    .exec(function(err, conversation){
      var partnerId = conversation.conversationPartners.filter(function(item, index){
        return item != req.decoded._doc._id;
      })

      User.findById(partnerId).exec(function(err, contact){
        res.json(contact);
      })
    })
})

// get all contacts
.put('/addtomycontacts/:id', function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
  if (err) res.send(err);
	  User.findById(req.params.id, function(err, contact) {
  	  if (err) res.send(err);
      var newConversation = new Conversation({conversationPartners: [user._id, contact._id]});      
      newConversation.save(function(err, conversation){        
        user.contacts.push({contactee: contact, confirmed: false, conversationId: conversation._id})
        contact.contacts.push({contactee: user, confirmed: false, conversationId: conversation._id})
        user.save(function(err) {
          if (err) res.send(err);
          contact.save(function(err){
            res.json({ success: true, message: 'Contact was added successfully!' });
          })
        });
      })     	  	
	  });
  }); 
})

// get all contacts
.delete('/removefrommycontacts/:contacteeId/:contactId/:conversationId', function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
  	if (err) res.send(err);
    user.contacts.pull(req.params.contactId)
    Conversation.findByIdAndRemove(req.params.conversationId, function(err){
      if(err) res.send(err)
    })
    user.save(function(err){
      User.findOneAndUpdate(
        {_id: req.params.contacteeId},
        {$pull: {contacts: {cotnactee: req.decoded._doc._id}}},
        function(err, contact){
          res.json({ success: true, message: 'Contact was removed successfully!' });
        }
      )
    });
  });
})

module.exports = router;