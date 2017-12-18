import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

export class MessageSchema {

    public static getMessageModel(): any {
        let messagesSchema = new Schema({
            nickname: String,
            message: String
        });

        return mongoose.model('messages', messagesSchema);
    }
}