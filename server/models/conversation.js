var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
	message: String,
	sender: String,
	date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Conversation', new Schema({
	messages: [messageSchema],
	conversationPartners: [{type: String}]
}));