/* eslint-disable */
import test from 'ava';

const kexpress = require('kexpress');
const LogicalError = kexpress.errors.LogicalError;
const logger = require('ktoolkit').logger.output;

const mockActions = require('./lib/mockActions');
const mockUser = require('./models/mockUser');
const mockModel = require('./models/mockModels');
const mockPlayer = require('./models/mockPlayer');
const mockTransaction = require('./models/mockTransaction');
const mockSendMessage = require('./lib/mockSendMessage');
const mockGenerateVericode = require('./lib/mockGenerateVericode');
const mockFs = require('./lib/mockFs');
// 加载所有的真模块，并用后加载的假模块替代
mockActions.doMock();
mockModel.playerMock();
mockModel.userMock();
mockModel.customGameMock();
mockTransaction.doMockError();
mockSendMessage.doMockError();
mockGenerateVericode.doMock();
// 执行造假函数
const Model = require('../apps/game/models/index');
const User = Model.User;
const Player = Model.Player;
const CustomGame = Model.CustomGame;
// 获取已经造假的User类，在测试前需要插入一些假数据

const {
    actionLogin,
    actionRegister,
    actionGetVerifyCode,
    actionLoginPasswd,
    actionGetPlayer,
    actionModifyInfo,
    actionModifyPortrait,
    actionGetCollections
} = require('../apps/game/actions/game');

const res = {
    json: function(data) {
        this.data = data;
    }
};

async function collectionNoLogin() {
    const player = await Player.findOne({
        where: {
            name: 'jxy'
        }
    })
    const req = {
        params: {
            'playerId': player._data._id
        },
        session: {

        }
    };
    try {
        await actionGetCollections(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function collectionNoUser() {
    const req = {
        params: {
            'playerId': null
        },
        session: {
            accessToken: '123'
        }
    };
    try {
        await actionGetCollections(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function getCollection() {
    const player = await Player.findOne({
        where: {
            name: 'jxy'
        }
    })
    const req = {
        params: {
            'playerId': player._data._id
        },
        query: {

        },
        session: {
            accessToken: '123456'
        }
    };
    try {
        await actionGetCollections(req, res);
        return res.json;
    }
    catch(e) {
        logger.info(e);
        return null;
    }
}


test.before(async t => {
    await User.findOrCreate({
        where: {
            'tel': '18756530711',
            'passwd': '000000'
        }
    });
    await User.findOrCreate({
        where: {
            'tel': '18756530713',
            'passwd': '000000'
        }
    });
    const user1 = await User.findOne({
        where: {
            'tel': '18756530711'
        }
    });
    await Player.findOrCreate({
        where: {
            'name': 'jxy',
            'userId': user1._data._id
        }
    });
    const player = await Player.findOne({
        where: {
            'name': 'jxy'
        }
    });
    await CustomGame.findOrCreate({
        where: {
            map: '1,2,3'
        }
    });
    const customGame = await CustomGame.findOne({
        where: {
            map: '1,2,3'
        }
    });
    await player.setCustomGame(customGame);
});

test('获取收藏地图-未登录', async t => {
    const errorCode = await collectionNoLogin();
    t.is(errorCode, 67009);
});

test('获取收藏地图-用户不存在', async t => {
    const errorCode = await collectionNoUser();
    t.is(errorCode, 67007);
});

// test('获取收藏地图-成功', async t => {
//     const result = await getCollection();
//     t.true(result != null);
// });
