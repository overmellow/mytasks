var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Task', new Schema({
  userId: String,
  name: String,
  completed: Boolean
}));