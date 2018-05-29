const kexpress = require('kexpress');
const defineLogicalErrors = kexpress.errors.defineLogicalErrors;

module.exports = defineLogicalErrors({
    InternalException: {
        id: 67001,
        message: 'Server internal exception',
        status: 500,
    },
    TimeLimitError: {
        id: 67002,
        message: 'overtime'
    },
    // If there is no status field, the default status is 500
    FieldsError: {
        id: 67003,
        message: 'The format of fields is incorrect.',
    },
    VerifyCodeError: {
        id: 67004,
        message: 'The verification code is incorrect.',
    },
    DuplicateRegister: {
        id: 67005,
        message: 'The telphone has registered.'
    },
    MessageError: {
        id: 67006,
        message: 'sendMessage error',
        status: 404,
    },
    NoSuchUser: {
        id: 67007,
        message: 'no such user',
        status: 404,
    },
    PassswdWrong: {
        id: 67008,
        message: 'password is wrong',
        status: 404,
    },
    InLoginError: {
        id: 67009,
        message: 'user has not logined',
        status: 404,
    },
    NoSuchMap: {
        id: 67010,
        message: 'no such map',
        status: 404,
    },
    failMap: {
        id: 67011,
        message: 'map run fail',
        status: 500
    },
    NoMoreMap: {
        id: 67012,
        message: 'no more map',
        status: 500
    },
    VipLimit: {
        id: 67013,
        message: 'you are not vip',
        status: 500
    }
});
