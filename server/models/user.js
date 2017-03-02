var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  email: String,
  password: String,
	contacts: [{
		confirmed: Boolean,  
		contactee: { type: Schema.Types.ObjectId, ref: 'User' },
		conversationId: String,		
	}]
}));