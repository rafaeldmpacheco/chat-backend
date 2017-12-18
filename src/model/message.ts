var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BearSchema = new Schema({
    nickname: String,
    message: String
});

module.exports = mongoose.model('messages', BearSchema);