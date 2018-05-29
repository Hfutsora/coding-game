const kexpress = require('kexpress');
const defineLogicalErrors = kexpress.errors.defineLogicalErrors;

module.exports = defineLogicalErrors({
    InternalException: {
        id: 67001,
        message: 'Server internal exception',
        status: 500,
    },
    ShopNotFound: {
        id: 67002,
        message: 'User is not found',
        status: 404,
    },
    CustomerNotFound: {
        id: 67002,
        message: 'Customer is not found',
        status: 404,
    },
    // If there is no status field, the default status is 500
    FieldsError: {
        id: 67003,
        message: 'The format of fields is incorrect.',
    },
    VerifyCodeError: {
        id: 67004,
        message: 'The verification code is incorrect.',
    }
});
