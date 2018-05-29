const fs = require('fs');
const logger = require('ktoolkit').logger.output;

function doMock() {
    fs.existsSync = function(path) {
        return true;
    }
    fs.mkdirSync = function(path) {
        logger.info('mkdir');
    }
    fs.writeFileSync = function(path) {
        logger.info('write');
    }
}

module.exports = {
    doMock
}
