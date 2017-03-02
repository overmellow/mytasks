var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Contact', new Schema({
	_contacter: { type: Number, ref: 'User' },
	_contactee: { type: Number, ref: 'User' },
	confirmed: Boolean, 
}));