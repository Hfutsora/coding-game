/* eslint-disable */
const kexpress = require('kexpress');
function doMock() {
    kexpress.core.action.Action.Create = function(options) {
        return options.handler;
    };
}

module.exports = {
    doMock
};
