import {Router} from "express";

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');

var Bear = require('../model/message');

export class MessageRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.route('/').get(function (req, res) {
            Bear.find(function (err, bears) {
                if (err) {
                    res.send(err);
                }
                res.json(bears);

            });
        });
    }

}

const messageRouter = new MessageRouter();
messageRouter.init();
export default messageRouter.router;
