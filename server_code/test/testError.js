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
mockTransaction.doMockError();
mockSendMessage.doMockError();
mockGenerateVericode.doMock();
// 执行造假函数
const Model = require('../apps/game/models/index');
const User = Model.User;
const Player = Model.Player;
// 获取已经造假的User类，在测试前需要插入一些假数据

const {
    actionLogin,
    actionRegister,
    actionGetVerifyCode,
    actionLoginPasswd,
    actionGetPlayer,
    actionModifyInfo,
    actionModifyPortrait
} = require('../apps/game/actions/game');

const res = {
    json: function(data) {
        this.data = data;
    }
};

async function sendMessageError() {
    const req = {
        params: {
            'tel': '18756530711'
        },
        query: {
            'type': 'login'
        },
        session: {}
    };
    try {
       await actionGetVerifyCode(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function registerInterError() {
    const User = Model.User;
    const req = {
        body: {
            'tel': '18756530712',
            'vericode': '845324',
            'name': 'jxy',
            'passwd': '123',
            'type':'register'
        },
        session: {
            'tel': '18756530712',
            'register': {
                'verifyCode': '845324'
            }
        }
    };
    req.session.register.expired = new Date().getTime() + 1000 * 60 * 5;

    try {
        await actionRegister(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function modifyInfoInterError() {
    const player = await Player.findOne({
        where: {
            name: 'jxy'
        }
    })
    const req = {
        params: {
            'playerId': player._data._id
        },
        body: {
            name: 'jxy',
            gender: '男',
            description: '111',
            headChange: 0
        },
        session: {
            accessToken: '123'
        }
    };
    try {
        await actionModifyInfo(req, res);
    }
    catch(e) {
        logger.info('修改个人信息-commit失败', e);
        return e._id;
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
    const user2 = await User.findOne({
        where: {
            'tel': '18756530713'
        }
    });
    await Player.findOrCreate({
        where: {
            'name': 'jxy',
            'userId': user1._data._id
        }
    });
    await Player.findOrCreate({
        where: {
            'name': 'jxy1',
            'userId': user2._data._id
        }
    });
});

test('获取注册验证码-发送失败', async t => {
    const errorCode = await sendMessageError();
    t.is(errorCode, 67006);
});

test('注册-commit失败', async t => {
    const errorCode = await registerInterError();
    t.is(errorCode, 67001);
});

test('修改个人信息-commit失败', async t => {
    const errorCode = await modifyInfoInterError();
    t.is(errorCode, 67001);
});

