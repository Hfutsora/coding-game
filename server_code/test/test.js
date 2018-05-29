/* eslint-disable */
const checkVericode = require('../apps/game/lib/checkVericode').checkVericode;
const sendMessage = require('../apps/game/lib/sendMessage').sendMessage;
const generateVericode = require('../apps/game/lib/generateVericode').generateVericode;
const assert = require('assert');
describe('工具函数测试', function() {

    describe('检查验证码', function() {
        it('验证码错误 返回0', function() {
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
            assert.equal(result, 0);
        });

        it('验证码正确 返回2', function() {
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
            assert.equal(result, 2);
        });

        it('验证码正确 返回1', function() {
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
            assert.equal(result, 1);
        });
    });

    describe('检查发送验证码', function() {
        // it('发送短信失败,手机号码有误', async function() {
        //     try {
        //         const result = await sendMessage('login', '', '123456');
        //     }
        //     catch(e) {
        //         assert.equal(e.message, 'PhoneNumbers is mandatory for this action.');
        //     }
        // });

        // it('发送短信成功', async function() {
        //     const result = await sendMessage('login', '18756530711', '123456');
        //     assert.equal(result.Code, 'OK');
        // });

    });

    describe('检查产生验证码', function() {
        it('检查验证码的产生', function() {
            const code = generateVericode();
            assert.equal(6, code.length);
        })
    });
});
