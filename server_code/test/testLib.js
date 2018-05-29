/* eslint-disable */
import test from 'ava';

const checkVericode = require('../apps/game/lib/checkVericode').checkVericode;
const sendMessage = require('../apps/game/lib/sendMessage').sendMessage;
const generateVericode = require('../apps/game/lib/generateVericode').generateVericode;
const mockTransaction = require('./models/mockTransaction');
mockTransaction.doMock();
const transaction = require('../models/transaction').transaction;

function veriCodeError() {
    const body = {
        tel: '18756530711',
        vericode: '123456'
    };
    const time = new Date().getTime()+1000*60*5;
    const session = {
        login: {
            verifyCode: '123457',
            expired: time
        },
        tel: '18756530711'
    }
    const type = 'login'
    const result = checkVericode(body, session, type);
    return result;
}

function veriCodeLackSession() {
    const body = {
        tel: '18756530711',
        vericode: '123456'
    };
    const time = new Date().getTime()+1000*60*5;
    const session = {
        tel: '18756530711'
    }
    const type = 'login'
    const result = checkVericode(body, session, type);
    return result;
}

function rightVericode() {
    const body = {
        tel: '18756530711',
        vericode: '123456'
    };
    const time = new Date().getTime()+1000*60*5;
    const session = {
        login: {
            verifyCode: '123456',
            expired: time
        },
        tel: '18756530711'
    }
    const type = 'login'
    const result = checkVericode(body, session, type);
    return result;
}

function timeLimit() {
    const body = {
        tel: '18756530711',
        vericode: '123456'
    };
    const time = new Date().getTime()-1000;
    const session = {
        login: {
            verifyCode: '123456',
            expired: time
        },
        tel: '18756530711'
    }
    const type = 'login'
    const result = checkVericode(body, session, type);
    return result;
}

async function sendMessageError() {
    try {
        const result = await sendMessage('login', '', '123456');
    }
    catch(e) {
        return e.message;
    }
}

async function sendMessageSuceed() {
    const result = await sendMessage('login', '18756530711', '123456');
    return result.Code;
}

function genVericode() {
    const code = generateVericode();
    return code.length;
}

async function getTransaction() {
    const result = await transaction();
    return result;
}

test('验证码检查工具-验证码错误', t => {
    const result = veriCodeError();
    t.is(result, 0);
});

test('验证码检查工具-验证码错误', t => {
    const result = veriCodeLackSession();
    t.is(result, 0);
});

test('验证码检查工具-验证码正确', t => {
    const result = rightVericode();
    t.is(result, 2);
});

test('验证码检查工具-验证码超时', t => {
    const result = timeLimit();
    t.is(result, 1);
});

// test('发送验证码-手机号码不存在', async t => {
//     const error = await sendMessageError();
//     t.is(error, 'PhoneNumbers is mandatory for this action.');
// });

// test('发送验证码-发送成功', async t => {
//     const result = await sendMessageSuceed();
//     t.is(result, 'OK');
// });

test('获得事务管理', async t => {
    const result = await getTransaction();
    t.true(result != null);
});

test('生成验证码', t => {
    const result = genVericode();
    t.is(result, 6);
});
