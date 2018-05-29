const sendMessage = require('../../apps/game/lib/sendMessage');

const doMock = function() {
    sendMessage.sendMessage = async function() {
        return {
            Message: 'OK'
        };
    };
};

const doMockError = function() {
    sendMessage.sendMessage = async function() {
        return {
            Message: 'ERROR'
        };
    };
}

module.exports = {
    doMock,
    doMockError
};

