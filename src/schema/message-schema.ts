import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let messagesSchema = new Schema({
    nickname: String,
    message: String
});

module.exports = mongoose.model('messages', messagesSchema);