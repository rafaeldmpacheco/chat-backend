var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messagesSchema = new Schema({
    nickname: String,
    message: String
});

module.exports = mongoose.model('messages', messagesSchema);