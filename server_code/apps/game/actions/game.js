const kexpress = require('kexpress');
const Action = kexpress.core.action.Action;
const errors = require('../config/errors');
const logger = require('ktoolkit').logger.output;
const fs = require('fs');
const LogicalError = kexpress.errors.LogicalError;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const querystring = require('querystring');
const moment = require('moment');

const transaction = require('../../../models/transaction').transaction;
// const sendMessage = require('../lib/sendMessage').sendMessage;
const generateVericode = require('../lib/generateVericode').generateVericode;
const checkVericode = require('../lib/checkVericode').checkVericode;
const query = require('../models/rawQuery').query;
const alipayparam = require('../config/alipay').params;
const createOrderId = require('../lib/aliPayUtil').createOrderId;
const getSign = require('../lib/aliPayUtil').getSign;

const constant = require('../config/constant');
const rechargeAmount = constant.recharge;

const models = require('../models');
const User = models.User;
const Player = models.Player;
const Star = models.Star;
const CustomGame = models.CustomGame;
const StandardGame = models.StandardGame;
const Recharge = models.Recharge;
const Leave = models.Leave;
const Turtle = models.Turtle;
const Frog = models.Frog;

const actionGetVerifyCode = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: true,
                properties: {
                    tel: 'string*'
                }
            },
            query: {
                type: 'object',
                required: true,
                properties: {
                    type: 'string*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true
            },
        }
    },
    async handler(req, res) {
        logger.info(req.headers);
        const user = await User.findOne({
            where: {
                tel: req.params.tel
            }
        });
        if (req.query.type === 'register' && user !== null) {
            throw new errors.DuplicateRegister();
        }
        if (req.query.type === 'login' && user === null) {
            throw new errors.NoSuchUser();
        }
        const verifyCode = generateVericode();
        // const verifyCode = '123456';
        logger.info(verifyCode);
        try {
            // const messageRes = await sendMessage(req.query.type, req.params.tel, verifyCode);
            // if (messageRes.Message !== 'OK') {
            //     logger.info(messageRes);
            //     throw new errors.MessageError();
            // }
            req.session.tel = req.params.tel;
            const expired = new Date().getTime() + (5 * 60 * 1000);
            req.session[req.query.type] = {
                verifyCode: verifyCode,
                expired: expired
            };
            res.json({});
        } catch (e) {
            logger.info(e);
            throw new errors.MessageError();
        }
    }
});

const actionLogin = Action.Create({
    prehandlers: {
        request: {
            body: {
                type: 'object',
                required: true,
                properties: {
                    tel: 'string*',
                    vericode: 'string*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {
                    playerId: 'integer*'
                }
            },
        }
    },
    async handler(req, res) {
        const tel = req.body.tel;
        const user = await User.findOne({
            where: {
                tel: tel
            }
        });
        if (!user) {
            throw new errors.NoSuchUser();
        }
        const check = checkVericode(req.body, req.session, 'login');
        if (check === 2) {
            req.session.accessToken = req.session.tel;
            const player = await user.getPlayer();
            res.json(player.get({
                plain: true
            }));
        } else if (check === 0) {
            throw new errors.VerifyCodeError();
        } else if (check === 1) {
            throw new errors.TimeLimitError();
        }
    }
});

const actionLoginPasswd = Action.Create({
    prehandlers: {
        request: {
            body: {
                type: 'object',
                required: true,
                properties: {
                    tel: 'string*',
                    passwd: 'string*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {
                    playerId: 'integer*'
                }
            },
        }
    },
    async handler(req, res) {
        const tel = req.body.tel;
        let user = await User.findOne({
            where: {
                tel: tel
            }
        });
        if (user) {
            if (user.passwd === req.body.passwd) {
                const player = await user.getPlayer();
                req.session.accessToken = req.body.tel;
                res.json(player.get({
                    plain: true
                }));
            } else {
                throw new errors.PassswdWrong();
            }
        } else {
            const player = await Player.findOne({
                where: {
                    name: req.body.tel
                }
            });
            if (!player) {
                throw new errors.NoSuchUser();
            } else {
                user = await User.findOne({
                    where: {
                        id: player.userId
                    }
                });
                if (user.passwd === req.body.passwd) {
                    req.session.accessToken = req.body.tel;
                    res.json(player.get({
                        plain: true
                    }));
                } else {
                    throw new errors.PassswdWrong();
                }
            }
        }
    }
});

const actionRegister = Action.Create({
    prehandlers: {
        request: {
            body: {
                type: 'object',
                required: true,
                properties: {
                    tel: 'string*',
                    vericode: 'string*',
                    name: 'string*',
                    passwd: 'string*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {
                    playerId: 'integer*'
                }
            },
        }
    },
    async handler(req, res) {
        logger.info(req.session.tel, req.session.register);
        const check = checkVericode(req.body, req.session, 'register');
        if (check === 0) {
            throw new errors.VerifyCodeError();
        } else if (check === 1) {
            throw new errors.TimeLimitError();
        }
        const tel = req.body.tel;
        let user = await User.findOne({
            where: {
                tel: tel
            }
        });
        if (user) {
            throw new errors.DuplicateRegister();
        }
        let player = null;
        const t = await transaction();
        try {
            const userList = await User.findOrCreate({
                where: {
                    tel: req.body.tel,
                    passwd: req.body.passwd
                },
                transaction: t
            });
            user = userList[0];
            player = await Player.build({
                name: req.body.name,
                portrait: 'default/default-headpic.png'
            });
            await player.save({
                transaction: t
            });
            logger.info(player.get({
                plain: true
            }));
            await user.setPlayer(player, {
                transaction: t
            });
            t.commit();
            req.session.accessToken = req.body.tel;
            res.json(player.get({
                plain: true
            }));
        } catch (e) {
            t.rollback();
            throw new errors.InternalException();
        }
    }
});

const actionGetPlayer = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: true,
                properties: {
                    playerId: 'string*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {
                    name: 'integer*',
                    description: 'string*',
                    portrait: 'string*',
                    vip: 'integer*'
                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const player = await Player.findOne({
            attributes: ['id', 'name', 'description', 'portrait', 'vip'],
            where: {
                id: req.params.playerId
            }
        });
        if (!player) {
            throw new errors.NoSuchUser();
        }

        res.json(player.get({
            plain: true
        }));
    }
});

const actionModifyInfo = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: true,
                properties: {
                    playerId: 'string*'
                }
            },
            body: {
                type: 'object',
                required: true,
                properties: {
                    name: 'string*',
                    gender: 'string*',
                    description: 'string*',
                    headChange: 'integer*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {
                    name: 'integer*',
                    description: 'string*',
                    gender: 'integer*',
                    portrait: 'string*'
                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const t = await transaction();
        try {
            const player = await Player.findOne({
                attributes: ['id', 'name', 'gender', 'description', 'portrait'],
                where: {
                    id: req.params.playerId
                },
                transaction: t
            });
            if (!player) {
                throw new errors.NoSuchUser();
            }
            player.name = req.body.name;
            player.gender = req.body.gender;
            player.description = req.body.description;

            logger.info(player.get({
                plain: true
            }));
            if (req.body.headChange === 1) {
                const base64Data = req.body.portrait.replace(/^data:image\/\w+;base64,/, '');
                const imgBuffer = new Buffer(base64Data, 'base64');
                const time = new Date().getTime();
                const imgURL = `portrait/${req.params.playerId}-${time}.png`;
                const imgPath = `apps/game/public/${imgURL}`;
                if (!fs.existsSync('apps/game/public/portrait')) {
                    fs.mkdirSync('apps/game/public/portrait');
                }
                fs.writeFileSync(imgPath, imgBuffer, {
                    encoding: 'base64'
                });
                player.portrait = imgURL;
            }
            await player.save({
                transaction: t
            });

            t.commit();
            res.json(player.get({
                plain: true
            }));
        } catch (e) {
            t.rollback();
            logger.info(e instanceof LogicalError);
            if (e instanceof LogicalError) {
                throw e;
            } else {
                throw errors.InternalException();
            }
        }
    }
});

const actionModifyPortrait = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: true,
                properties: {
                    playerId: 'string*'
                }
            },
            body: {
                type: 'object',
                required: true,
                properties: {
                    portrait: 'string*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {
                    portrait: 'string*'
                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const player = await Player.findOne({
            where: {
                id: req.params.playerId
            }
        });
        if (!player) {
            throw new errors.NoSuchUser();
        }

        const base64Data = req.body.portrait.replace(/^data:image\/\w+;base64,/, '');
        const imgBuffer = new Buffer(base64Data, 'base64');
        const imgURL = `portrait/${req.params.playerId}.png`;
        const imgPath = `apps/game/public/portrait/${req.params.playerId}.png`;
        if (!fs.existsSync('apps/game/public/portrait')) {
            fs.mkdirSync('apps/game/public/portrait');
        }
        fs.writeFileSync(imgPath, imgBuffer, {
            encoding: 'base64'
        });
        player.portrait = imgURL;
        await player.save();

        res.json({
            portrait: imgPath
        });
    }
});

const actionGetStages = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: true,
                properties: {
                    playerId: 'string*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {
                    stage: 'string*',
                    score: 'integer*'
                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const player = await Player.findOne({
            where: {
                id: req.params.playerId
            }
        });
        if (!player) {
            throw new errors.NoSuchUser();
        }

        let stars = await Star.findAll({
            where: {
                playerId: req.params.playerId
            },
            order: [
                ['star', 'DESC']
            ]
        });
        let sum = 0;
        stars.forEach(star => {
            sum += star.star;
        });
        sum = parseInt(sum * 10 / stars.length);
        const score = (sum / 10).toFixed(1);
        stars = stars.slice(0, 3);
        res.json({
            stage: player.stage,
            score: score,
            bestThree: stars
        });
    }
});

const actionGetCollections = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: true,
                properties: {
                    playerId: 'string*'
                }
            },
            query: {
                type: 'object',
                required: false,
                properties: {
                    perPage: {
                        type: 'string',
                        required: false
                    },
                    start: {
                        type: 'string',
                        required: false
                    }
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const player = await Player.findOne({
            where: {
                id: req.params.playerId
            }
        });
        if (!player) {
            throw new errors.NoSuchUser();
        }
        const perPage = !req.query.perPage ? 5 : parseInt(req.query.perPage);
        const start = !req.query.start ? 0 : parseInt(req.query.start - 1) * perPage;
        const collections = await player.getCustomGames({
            scope: false,
            offset: start,
            limit: perPage
        });
        const resultCol = collections.map(collection => {
            collection.score = (collection.score / 10).toFixed(1);
            collection = collection.get({
                plain: true
            });
            delete collection.collections;

            return collection;
        });
        for (let i = 0; i < resultCol.length; i++) {
            const playerUser = await Player.findOne({
                where: {
                    id: resultCol[i].playerId
                }
            });
            resultCol[i].playerName = playerUser.name;
        }
        res.json({
            collections: resultCol
        });
    }
});

const actionGetCustomGames = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: true,
                properties: {
                    playerId: 'string*'
                }
            },
            query: {
                type: 'object',
                required: false,
                properties: {
                    perPage: {
                        type: 'string',
                        required: false
                    },
                    start: {
                        type: 'string',
                        required: false
                    }
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const player = await Player.findOne({
            where: {
                id: req.params.playerId
            }
        });
        if (!player) {
            throw new errors.NoSuchUser();
        }

        const customGames = await player.getSelfGames();
        const result = customGames.map(customGame => {
            customGame.score = (customGame.score / 10).toFixed(1);

            return customGame.get({
                plain: true
            });
        });
        for (let i = 0; i < result.length; i++) {
            const playerUser = await Player.findOne({
                where: {
                    id: result[i].playerId
                }
            });
            result[i].playerName = playerUser.name;
        }

        res.json({
            customGames: result
        });
    }
});

const actionPraise = Action.Create({
    prehandlers: {
        request: {
            body: {
                type: 'object',
                required: false,
                properties: {
                    mapId: 'integer*',
                    type: 'integer*',
                    playerId: 'integer*',
                    praise: 'integer*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const player = await Player.findOne({
            where: {
                id: req.body.playerId
            }
        });
        if (!player) {
            throw new errors.NoSuchUser();
        }

        const t = await transaction();
        try {
            if (req.body.type === 0) {
                const standardGame = await StandardGame.findOne({
                    where: {
                        id: req.body.mapId
                    },
                    transaction: t
                });
                if (!standardGame) {
                    throw new errors.NoSuchMap();
                }
                standardGame.praise += req.body.praise;
                await standardGame.save({
                    transaction: t
                });
            } else {
                const customGame = await CustomGame.findOne({
                    where: {
                        id: req.body.mapId
                    },
                    transaction: t
                });
                if (!customGame) {
                    throw new errors.NoSuchMap();
                }
                customGame.praise += req.body.praise;
                await customGame.save({
                    transaction: t
                });
            }
            t.commit();
            res.json({});
        } catch (e) {
            t.rollback();
            if (e instanceof LogicalError) {
                throw e;
            } else {
                throw errors.InternalException();
            }
        }
    }
});

const actionCollectGame = Action.Create({
    prehandlers: {
        request: {
            body: {
                type: 'object',
                required: false,
                properties: {
                    mapId: 'integer*',
                    playerId: 'integer*',
                    collection: 'integer*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const player = await Player.findOne({
            where: {
                id: req.body.playerId
            }
        });
        if (!player) {
            throw new errors.NoSuchUser();
        }
        if (req.body.collection === 1) {
            try {
                await player.addCustomGame(req.body.mapId, {
                    through: {
                        type: req.body.type
                    }
                });
            } catch (e) {
                throw new errors.NoSuchMap();
            }
        } else {
            await player.removeCustomGame(req.body.mapId, {
                through: {
                    type: req.body.type
                }
            });
        }

        res.json({});
    }
});

const actionDelCustomGame = Action.Create({
    prehandlers: {
        request: {
            body: {
                type: 'object',
                required: false,
                properties: {
                    mapId: 'integer*',
                    playerId: 'integer*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const player = await Player.findOne({
            where: {
                id: req.body.playerId
            }
        });
        if (!player) {
            throw new errors.NoSuchUser();
        }
        await CustomGame.destroy({
            where: {
                id: req.body.mapId,
                playerId: req.body.playerId
            }
        });

        res.json({});
    }
});

const actionStageList = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: false,
                properties: {
                    playerId: 'string*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        let stages = null;
        if (req.session.accessToken) {
            stages = await query('SELECT standardgame.id, standardgame.img, y.star FROM standardgame left join (select * from star where playerId = :playerId) as y on standardgame.id=y.standardGameId;', {
                replacements: {
                    playerId: req.params.playerId
                }
            });
        } else {
            stages = await StandardGame.findAll({
                where: {
                    id: {
                        [Op.lte]: 5
                    }
                }
            });
        }
        res.json({
            stages: stages
        });
    }
});

const actionGetDetailStandard = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: false,
                properties: {
                    mapId: 'string*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        const mapId = parseInt(req.params.mapId);
        if (mapId > 5) {
            if (!req.session.accessToken) {
                throw new errors.InLoginError();
            }
        }
        const player = await Player.findOne({
            where: {
                id: req.query.playerId
            }
        });
        if (mapId > 10 && player.vip === 0) {
            throw new errors.VipLimit();
        }
        const standardGame = await StandardGame.findOne({
            where: {
                id: req.params.mapId
            }
        });
        const blockyRaw = await standardGame.getBlocklies();
        const frog = await standardGame.getFrog();
        const turtle = await standardGame.getTurtle();
        const leaves = await standardGame.getLeaves();

        const map = standardGame.map.split(',');
        const blockly = blockyRaw.map(one => {
            return one.stanblockly.blocklyId;
        });

        res.json({
            id: req.params.mapId,
            map: map,
            tip: standardGame.get('tip'),
            blocky: blockly,
            frog: frog,
            turtle: turtle,
            leaves: leaves
        });
    }
});

const actionGetDetailCustom = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: false,
                properties: {
                    mapId: 'string*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        const mapId = parseInt(req.params.mapId);
        if (mapId > 5) {
            if (!req.session.accessToken) {
                throw new errors.InLoginError();
            }
        }
        const customGame = await CustomGame.findOne({
            where: {
                id: req.params.mapId
            }
        });
        const blockyRaw = await customGame.getBlocklies();
        const frog = await customGame.getFrog();
        const turtle = await customGame.getTurtle();
        const leaves = await customGame.getLeaves();

        const map = customGame.map.split(',');
        const blockly = blockyRaw.map(one => {
            return one.customblockly.blocklyId;
        });

        res.json({
            id: req.params.mapId,
            map: map,
            blocky: blockly,
            frog: frog,
            turtle: turtle,
            leaves: leaves
        });
    }
});

const actionThroughStage = Action.Create({
    prehandlers: {
        request: {
            body: {
                type: 'object',
                required: false,
                properties: {
                    mapId: 'integer*',
                    playerId: 'integer*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const player = await Player.findOne({
            where: {
                id: req.body.playerId
            }
        });
        if (!player) {
            throw new errors.NoSuchUser();
        }
        const t = await transaction();
        try {
            let star = await player.getStandardGames({
                where: {
                    id: req.body.mapId
                },
                transaction: t
            });
            if (star.length === 0) {
                await player.addStandardGame(req.body.mapId, {
                    through: {
                        star: req.body.star
                    },
                    transaction: t
                });
            }
            else {
                star = star[0];
                if (star.star.star < req.body.star) {
                    await player.addStandardGame(req.body.mapId, {
                        through: {
                            star: req.body.star
                        },
                        transaction: t
                    });
                }
            }
            if (player.stage < req.body.mapId) {
                player.stage = req.body.mapId;
                await player.save({
                    transaction: t
                });
            }
            t.commit();
            res.json({});
        } catch (e) {
            t.rollback();
            if (e instanceof LogicalError) {
                throw e;
            } else {
                throw errors.InternalException();
            }
        }
    }
});

const actionAliPay = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: true
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {
                    data: {
                        type: 'object',
                        required: true
                    }
                }
            }
        }
    },
    async handler(req, res) {
        logger.info(req.body);
        const tradeNo = req.body.out_trade_no;
        const recharge = await Recharge.findOne({
            where: {
                tradeNo: tradeNo
            }
        });
        logger.info(recharge);
        recharge.timestampEnd = req.body.notify_time;
        recharge.trade_no = req.body.trade_no;
        recharge.status = req.body.trade_status;
        await recharge.save();
        if (req.body.trade_status === 'TRADE_SUCCESS') {
            const player = await Player.findOne({
                where: {
                    id: recharge.get('playerId')
                }
            });
            const rechargeNum = parseFloat(recharge.get('ammount'));
            if (rechargeNum*100 == rechargeAmount*100) {
                player.vip = 1;
            }
            await player.save();
        }
        res.send('success');
    }
});

const actionRecharge = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: true,
                playerId: 'string*'
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {
                    data: {
                        type: 'object',
                        required: true
                    }
                }
            }
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const player = await Player.findOne({
            where: {
                id: req.body.playerId
            }
        });
        if (!player) {
            throw new errors.NoSuchUser();
        }
        const params = JSON.parse(JSON.stringify(alipayparam));
        params.timestamp = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        params.biz_content.out_trade_no = createOrderId(req.body.playerId);
        params.biz_content.total_amount = rechargeAmount;
        const biz_content = params.biz_content;
        params.biz_content = JSON.stringify(params.biz_content);
        logger.info(params.biz_content);
        const paramStrList = Object.keys(params).map(key => {
            return `${key}=${params[key]}`;
        });
        paramStrList.sort();
        let str = paramStrList.join('&');
        const sign = getSign(str);
        params.sign = sign;
        str = `${str}&sign=${sign}`;
        logger.info(params);
        const paramsQuery = querystring.stringify(params);
        const uri = `https://openapi.alipaydev.com/gateway.do?${paramsQuery}`;
        logger.info(uri);
        logger.info(biz_content);
        const recharge = Recharge.build({
            tradeNo: biz_content.out_trade_no,
            ammount: rechargeAmount,
            timestampStart: params.timestamp
        });
        await recharge.save();
        await player.addRecharge(recharge);
        res.json({
            params: params,
            uri: uri
        });
    }
});

const actionGetAllCustomGames = Action.Create({
    prehandlers: {
        request: {
            query: {
                type: 'object',
                required: false,
                properties: {
                    perPage: {
                        type: 'string',
                        required: false
                    },
                    start: {
                        type: 'string',
                        required: false
                    }
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const perPage = !req.query.perPage ? 5 : parseInt(req.query.perPage);
        const start = !req.query.start ? 0 : parseInt(req.query.start) * perPage;

        const customGames = await CustomGame.findAll({
            offset: start,
            limit: perPage
        });
        if (customGames.length === 0) {
            throw new errors.NoMoreMap();
        }
        const result = customGames.map(customGame => {
            customGame.score = (customGame.score / 10).toFixed(1);

            return customGame;
        });
        for (let i = 0; i < result.length; i++) {
            const playerUser = await Player.findOne({
                where: {
                    id: result[i].playerId
                }
            });
            result[i].playerName = playerUser.name;
        }

        res.json({
            customGames: result
        });
    }
});

const actionSaveCustomGame = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: true,
                playerId: 'string*'
            },
            body: {
                type: 'object',
                required: false,
                properties: {
                    map: 'string*',
                    mapImg: 'string*',
                    turtle: {
                        type: 'object',
                        require: true,
                        properties: {
                            x: 'integer*',
                            y: 'integer*',
                            direction: 'integer*'
                        }
                    },
                    frog: {
                        type: 'object',
                        require: true,
                        properties: {
                            x: 'integer*',
                            y: 'integer*',
                            direction: 'integer*'
                        }
                    }
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const player = await Player.findOne({
            where: {
                id: req.params.playerId
            }
        });
        if (!player) {
            throw new errors.NoSuchUser();
        }

        const base64Data = req.body.mapImg.replace(/^data:image\/\w+;base64,/, '');
        const imgBuffer = new Buffer(base64Data, 'base64');
        const time = new Date().getTime();
        const imgURL = `map/${req.params.playerId}-${time}.png`;
        const imgPath = `apps/game/public/${imgURL}`;
        if (!fs.existsSync('apps/game/public/map')) {
            fs.mkdirSync('apps/game/public/map');
        }
        fs.writeFileSync(imgPath, imgBuffer, {
            encoding: 'base64'
        });
        const t = await transaction();
        try {
            const map = CustomGame.build({
                map: req.body.map,
                img: imgURL
            });
            await map.save({
                transaction: t
            });
            await player.addSelfGame(map, {
                transaction: t
            });
            const frog = Frog.build({
                x: req.body.frog.x,
                y: req.body.frog.y,
                direction: req.body.frog.direction
            })
            await frog.save({
                transaction: t
            });
            await map.setFrog(frog, {
                transaction: t
            });

            const turtle = Turtle.build({
                x: req.body.turtle.x,
                y: req.body.turtle.y,
                direction: req.body.turtle.direction
            })
            await turtle.save({
                transaction: t
            });
            await map.setTurtle(turtle, {
                transaction: t
            });

            for (let i = 0; i < req.body.leaves.length; i++) {
                const leave = Leave.build({
                    x: req.body.leaves[i].x,
                    y: req.body.leaves[i].y,
                    direction: req.body.leaves[i].direction
                });
                await leave.save({
                    transaction: t
                });
                await map.addLeave(leave, {
                    transaction: t
                });
            }
            await map.setBlocklies(req.body.blockly, {
                transaction: t
            });

            await t.commit();
            res.json({
                mapId: map.get('id')
            });
        }
        catch(e) {
            logger.info(e);
            t.rollback();
            if (e instanceof LogicalError) {
                throw e;
            } else {
                throw errors.InternalException();
            }
        }
    }
});

const actionTestCustomGame = Action.Create({
    prehandlers: {
        request: {
            body: {
                type: 'object',
                required: false,
                properties: {
                    mapId: 'integer*',
                    test: 'integer*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const map = await CustomGame.findOne({
            where: {
                id: req.body.mapId
            }
        });
        map.runStatus = req.body.test;
        await map.save();
        res.json({});
    }
});

const actionPublishCustomGame = Action.Create({
    prehandlers: {
        request: {
            body: {
                type: 'object',
                required: false,
                properties: {
                    mapId: 'integer*',
                    publish: 'integer*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const map = await CustomGame.findOne({
            where: {
                id: req.body.mapId
            }
        });
        if (map.runStatus === 0 && req.body.publish === 1) {
            throw new errors.failMap();
        }
        else {
            map.publishStatus = req.body.publish;
            await map.save();
            res.json({});
        }
    }
});

const actionScoreCustomGame = Action.Create({
    prehandlers: {
        request: {
            body: {
                type: 'object',
                required: false,
                properties: {
                    mapId: 'integer*',
                    score: 'integer*'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }

        const map = await CustomGame.findOne({
            where: {
                id: req.body.mapId
            }
        });
        if (!map) {
            throw new errors.NoSuchMap();
        }

        const score = (map.score * map.people + req.body.score * 10) / (map.people + 1);
        logger.info(score);
        map.people += 1;
        map.score = score;
        await map.save();
        res.json({});
    }
});

const actionLogout = Action.Create({
    prehandlers: {
        request: {
            params: {
                type: 'object',
                required: false,
                properties: {

                }
            }
        },
        response: {
            200: {
                type: 'object',
                required: true,
                properties: {

                }
            },
        }
    },
    async handler(req, res) {
        if (!req.session.accessToken) {
            throw new errors.InLoginError();
        }
        req.session.accessToken = null;
        res.json({});
    }
});

module.exports = {
    actionLogin,
    actionRegister,
    actionGetVerifyCode,
    actionLoginPasswd,
    actionGetPlayer,
    actionModifyInfo,
    actionModifyPortrait,
    actionGetStages,
    actionGetCollections,
    actionGetCustomGames,
    actionPraise,
    actionCollectGame,
    actionDelCustomGame,
    actionStageList,
    actionGetDetailStandard,
    actionThroughStage,
    actionAliPay,
    actionRecharge,
    actionGetDetailCustom,
    actionGetAllCustomGames,
    actionSaveCustomGame,
    actionTestCustomGame,
    actionPublishCustomGame,
    actionScoreCustomGame,
    actionLogout
};
