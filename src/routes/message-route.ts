import {Router} from "express";
import {MessageSchema} from '../schema/message-schema'

let mongoose = require('mongoose');

export class MessageRouter {

    public router: Router;

    constructor() {
        mongoose.connect('mongodb://localhost/chat');
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.route('/').get(function (req, res) {
            MessageSchema.getMessageModel().find(function (err, messages) {
                if (err) {
                    res.send(err);
                }
                res.json(messages);
            });
        });
    }

}

const messageRouter = new MessageRouter();
messageRouter.init();
export default messageRouter.router;
