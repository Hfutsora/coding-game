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
mockTransaction.doMock();
mockSendMessage.doMock();
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

async function rejectRegisterVericode() {
    const req = {
        params: {
            'tel': '18756530711'
        },
        query: {
            'type': 'register'
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

async function sendRegisterVericode() {
    const req = {
        params: {
            'tel': '18756530712'
        },
        query: {
            'type': 'register'
        },
        session: {}
    };
    try {
       await actionGetVerifyCode(req, res);
       return req.session.register.verifyCode;
    }
    catch(e) {
        return '';
    }
}

async function rejectLoginVericode() {
    const req = {
        params: {
            'tel': '18756530712'
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

async function sendLoginVericode() {
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
       return req.session.login.verifyCode;
    }
    catch(e) {
        return '';
    }
}

async function duplicateRegister() {
    const User = Model.User;
    const req = {
        body: {
            'tel': '18756530711',
            'vericode': '845324',
            'name': 'jxy',
            'passwd': '123',
            'type':'register'
        },
        session: {
            'tel': '18756530711',
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

async function registerWrongCode() {
    const req = {
        body: {
            'tel': '18756530711',
            'vericode': '845324',
            'name': 'jxy',
            'passwd': '123',
            'type':'register'
        },
        session: {
            'tel': '18756530711',
            'register': {
                'verifyCode': '845400'
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

async function timeLimit() {
    const req = {
        body: {
            'tel': '18756530712',
            'vericode': '845324',
            'name': 'jxy',
            'passwd': '123',
            'type':'register'
        },
        session: {
            'tel': '18756530711',
            'register': {
                'verifyCode': '845400'
            }
        }
    };
    req.session.register.expired = new Date().getTime() - 1000 * 60 * 5;

    try {
        await actionRegister(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function register() {
    const req = {
        body: {
            'tel': '18756530714',
            'vericode': '845324',
            'name': 'jxy',
            'passwd': '123',
            'type':'register'
        },
        session: {
            'tel': '18756530714',
            'register': {
                'verifyCode': '845324'
            }
        }
    };
    req.session.register.expired = new Date().getTime() + 1000 * 60 * 5;

    try {
        await actionRegister(req, res);
        return res.json
    }
    catch(e) {
        return null;
    }
}

async function loginNoSuchUser() {
    const req = {
        body: {
            'tel': '18756530712',
            'vericode': '845324',
            'type':'login'
        },
        session: {
            'tel': '18756530712',
            'login': {
                'verifyCode': '845324'
            }
        }
    };
    req.session.login.expired = new Date().getTime() + 1000 * 60 * 5;

    try {
        await actionLogin(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function loginWrongVericode() {
    const req = {
        body: {
            'tel': '18756530711',
            'vericode': '845324',
            'type':'login'
        },
        session: {
            'tel': '18756530711',
            'login': {
                'verifyCode': '845320'
            }
        }
    };
    req.session.login.expired = new Date().getTime() + 1000 * 60 * 5;

    try {
        await actionLogin(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function loginTimeLimit() {
    const req = {
        body: {
            'tel': '18756530711',
            'vericode': '845324',
            'type':'login'
        },
        session: {
            'tel': '18756530711',
            'login': {
                'verifyCode': '845320'
            }
        }
    };
    req.session.login.expired = new Date().getTime() - 1000 * 60 * 5;

    try {
        await actionLogin(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function loginSucceed() {
    const req = {
        body: {
            'tel': '18756530711',
            'vericode': '845324',
            'type':'login'
        },
        session: {
            'tel': '18756530711',
            'login': {
                'verifyCode': '845324'
            }
        }
    };
    req.session.login.expired = new Date().getTime() + 1000 * 60 * 5;

    try {
        await actionLogin(req, res);
        return res.json;
    }
    catch(e) {
        return null;
    }
}

async function loginPassNoUser() {
    const req = {
        body: {
            'tel': '18756530712',
            'passwd': '845324'
        }
    };

    try {
        await actionLoginPasswd(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function loginPassNoUserName() {
    const req = {
        body: {
            'tel': 'username',
            'passwd': '845324'
        }
    };

    try {
        await actionLoginPasswd(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function loginPassWrong() {
    const req = {
        body: {
            'tel': '18756530711',
            'passwd': '845324'
        }
    };

    try {
        await actionLoginPasswd(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function loginPassWrongName() {
    const req = {
        body: {
            'tel': 'jxy',
            'passwd': '845324'
        }
    };

    try {
        await actionLoginPasswd(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function loginSucceedName() {
    const req = {
        body: {
            'tel': 'jxy',
            'passwd': '000000'
        },
        session: {

        }
    };

    try {
        await actionLoginPasswd(req, res);
        return res.json;
    }
    catch(e) {
        return null;
    }
}

async function loginSucceedTel() {
    const req = {
        body: {
            'tel': '18756530711',
            'passwd': '000000'
        },
        session: {

        }
    };

    try {
        await actionLoginPasswd(req, res);
        return res.json;
    }
    catch(e) {
        return null;
    }
}

async function getPlayerNoLogin() {
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
        await actionGetPlayer(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function getPlayerNoUser() {
    const req = {
        params: {
            'playerId': null
        },
        session: {
            accessToken: '123'
        }
    };
    try {
        await actionGetPlayer(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function getPlayer() {
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
            accessToken: '123'
        }
    };
    try {
        await actionGetPlayer(req, res);
        return res.json;
    }
    catch(e) {
        return null;
    }
}

async function modifyInfoNoLogin() {
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

        }
    };
    try {
        await actionModifyInfo(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function modifyInfoNoUser() {
    const req = {
        params: {
            'playerId': null
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
        return e._id;
    }
}

async function modifyInfoWithPic() {
    const player = await Player.findOne({
        where: {
            name: 'jxy1'
        }
    });
    const req = {
        params: {
            'playerId': player._data._id
        },
        body: {
            name: 'jxy',
            gender: '男',
            description: '111',
            headChange: 1,
            portrait: '1234567'
        },
        session: {
            accessToken: '123'
        }
    };
    try {
        await actionModifyInfo(req, res);
        return res.json;
    }
    catch(e) {
        return null;
    }
}

async function modifyInfoWithoutPic() {
    const player = await Player.findOne({
        where: {
            name: 'jxy1'
        }
    });
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
        return res.json;
    }
    catch(e) {
        return null;
    }
}

async function modifyPortraitNoLogin() {
    const player = await Player.findOne({
        where: {
            name: 'jxy1'
        }
    });
    const req = {
        params: {
            'playerId': player._data._id
        },
        body: {
            portait: '11111111111111',
        },
        session: {

        }
    };
    try {
        await actionModifyPortrait(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function modifyPortraitNoUser() {
    const req = {
        params: {
            'playerId': null
        },
        body: {
            portait: '11111111111111',
        },
        session: {
            accessToken: '123'
        }
    };
    try {
        await actionModifyPortrait(req, res);
    }
    catch(e) {
        return e._id;
    }
}

async function modifyPortrait() {
    const player = await Player.findOne({
        where: {
            name: 'jxy1'
        }
    });
    const req = {
        params: {
            'playerId': player._data._id
        },
        body: {
            portrait: '11111111111111',
        },
        session: {
            accessToken: '123'
        }
    };
    try {
        await actionModifyPortrait(req, res);
        return res;
    }
    catch(e) {
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

test('获取注册验证码-用户已注册', async t => {
    const errorCode = await rejectRegisterVericode();
    t.is(errorCode, 67005);
});

test('获取登录验证码-成功获取', async t => {
    const result = await sendRegisterVericode();
    t.is(result, '123456');
});

test('获取登录验证码-用户不存在', async t => {
    const errorCode = await rejectLoginVericode();
    t.is(errorCode, 67007);
});

test('获取注册验证码-成功获取', async t => {
    const result = await sendLoginVericode();
    t.is(result, '123456');
});


test('注册-用户已注册', async t => {
    const errorCode = await duplicateRegister();
    t.is(errorCode, 67005);
});

test('注册-验证码错误', async t => {
    const errorCode = await registerWrongCode();
    t.is(errorCode, 67004);
});

test('注册-验证码超时', async t => {
    const errorCode = await timeLimit();
    t.is(errorCode, 67002);
});

test('注册-成功', async t => {
    const result = await register();
    t.true(result != null);
});

test('登录-用户不存在', async t => {
    const errorCode = await loginNoSuchUser();
    t.is(errorCode, 67007);
});

test('登录-验证码错误', async t => {
    const errorCode = await loginWrongVericode();
    t.is(errorCode, 67004);
});

test('登录-验证码超时', async t => {
    const errorCode = await loginTimeLimit();
    t.is(errorCode, 67002);
});

test('登录-成功', async t => {
    const result = await loginSucceed();
    t.true(result != null);
});

test('密码登录-手机不存在', async t => {
    const errorCode = await loginPassNoUser();
    t.is(errorCode, 67007);
});

test('密码登录-用户名不存在', async t => {
    const errorCode = await loginPassNoUserName();
    t.is(errorCode, 67007);
});

test('密码登录-手机号码密码错误', async t => {
    const errorCode = await loginPassWrong();
    t.is(errorCode, 67008);
});

test('密码登录-用户名密码错误', async t => {
    const errorCode = await loginPassWrongName();
    t.is(errorCode, 67008);
});

test('密码登录-用户名成功', async t => {
    const result = await loginSucceedName();
    t.true(result != null);
});
test('密码登录-手机号成功', async t => {
    const result = await loginSucceedTel();
    t.true(result != null);
});

test('获取信息-未登录', async t => {
    const errorCode = await getPlayerNoLogin();
    t.is(errorCode, 67009);
});

test('获取信息-用户不存在', async t => {
    const errorCode = await getPlayerNoUser();
    t.is(errorCode, 67007);
});

test('获取信息-成功', async t => {
    const result = await getPlayer();
    t.true(result != null);
});

test('修改信息-未登录', async t => {
    const errorCode = await modifyInfoNoLogin();
    t.is(errorCode, 67009);
});

test('修改信息-用户不存在', async t => {
    const errorCode = await modifyInfoNoUser();
    t.is(errorCode, 67007);
});

// test('修改信息-包括头像', async t => {
//     const result = await modifyInfoWithPic();
//     t.true(result != null);
// });

test('修改信息-不包括头像', async t => {
    const result = await modifyInfoWithoutPic();
    t.true(result != null);
});

test('修改头像-未登录', async t => {
    const errorCode = await modifyPortraitNoLogin();
    t.is(errorCode, 67009);
});

test('修改头像-用户不存在', async t => {
    const errorCode = await modifyPortraitNoUser();
    t.is(errorCode, 67007);
});

// test('修改头像-成功', async t => {
//     const errorCode = await modifyPortrait();
//     t.true(errorCode != null);
// });
