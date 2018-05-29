const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const kexpress = require('kexpress');
const httpSession = require('express-session');
const connectSession = require('connect-session');
const MySQLStore = require('connect-mysql')(connectSession);
const databaseConfig = require('../../config/database');
const logger = require('ktoolkit').logger.output;

const gameRouter = require('./routes/game').router;

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
};

class Application extends kexpress.core.app.Application {
    constructor() {
        super({
            baseUrl: '/v1'
        });
    }

    // Override
    async prepare() {
        try {
            // const session = kexpress.middlewares.session;
            const watcher = kexpress.middlewares.access.watcher;
            const RequestChecker = require('kexpress-http').RequestChecker;
            const FieldsCheckerErrorHandler = require('./prehandlers/fields').errorHandler;

            this.use(httpSession({
                resave: true,
                secret: '123456',
                key: 'codefrog_game',
                cookie: {
                    maxAge: 1000 * 60 * 30
                },
                saveUninitialized: true,
                store: new MySQLStore({
                    config: {
                        user: databaseConfig.database.username,
                        password: databaseConfig.database.password,
                        database: databaseConfig.database.database
                    }
                })
            }));
            this.use(allowCrossDomain);
            this.use(express.static(path.join(__dirname, 'public')));
            this.use(watcher);
            this.use(bodyParser.json({
                limit: 10000000
            }));
            this.use(bodyParser.urlencoded({
                extended: true
            }));

            this.prehandle('request', new RequestChecker(FieldsCheckerErrorHandler));

            this.use('/v1/game', gameRouter);
        }
        catch (error) {
            logger.error(error);
        }
    }
}

module.exports = {
    Application: Application
};
