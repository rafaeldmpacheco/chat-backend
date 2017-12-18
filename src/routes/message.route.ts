import {Router} from "express";

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');

let messagesSchema = require('../model/message');

export class MessageRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.route('/').get(function (req, res) {
            messagesSchema.find(function (err, messages) {
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
