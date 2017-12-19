import {Router} from "express";
import * as mongoose from 'mongoose';

let messages = require('../schema/message-schema');

export class MessageRouter {

    public router: Router;

    constructor() {
        mongoose.connect('mongodb://localhost/chat', {
            useMongoClient: true
        });
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.route('/')
            .get(function (req, res) {
                messages.find(function (err, messages) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(messages);
                });
            })
            .post(function (req, res) {
                let newMessage = new messages(req.body);
                newMessage.save(function (err, message) {
                    if (err)
                        res.send(err);

                    res.json(message);
                });
            })
    }

}

const messageRouter = new MessageRouter();
messageRouter.init();
export default messageRouter.router;
