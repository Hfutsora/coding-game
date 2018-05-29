const generateVericode = require('../../apps/game/lib/generateVericode');

const doMock = function() {
    generateVericode.generateVericode = function() {
        return '123456';
    };
};

module.exports = {
    doMock
};
