import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as jsonWebToken from 'jsonwebtoken';
import MessageRouter from "./routes/message-route";

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes(): void {
        let corsMiddleware = express.Router();

        corsMiddleware.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Methods, ' +
                'Authorization, ' +
                'Access-Control-Allow-Headers, ' +
                'Access-Control-Allow-Origin, ' +
                'X-Requested-With, ' +
                'content-type, ' +
                'X-Auth-Token');

            if ('OPTIONS' == req.method) {
                res.send(200);
            } else {
                next();
            }

        });

        let authMiddleware = express.Router();

        authMiddleware.use((req, res, next) => {
            let token: any = req.headers['authorization'];
            if (token) {
                jsonWebToken.verify(token, 'ITATAKARU', function (err) {
                    if (err) {
                        return res.status(401).send({
                            message: 'Invalid token.'
                        });
                    } else {
                        next();
                    }
                })
            } else {
                return res.status(403).send({
                    message: 'No token provided.'
                })
            }
        });

        this.express.use('/api/messages', corsMiddleware, MessageRouter);
    }

}

export default new App().express;
