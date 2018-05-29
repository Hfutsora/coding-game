const transaction = require('../../models/transaction');
const logger = require('ktoolkit').logger.output;

function doMock() {
    transaction.transaction = async function() {
        const t = {
            rollback: function() {
                logger.info('rollback');
            },
            commit: function() {
                logger.info('commit');
            }
        }

        return t;
    };
}

function doMockError() {
    transaction.transaction = async function() {
        const t = {
            rollback: function() {
                logger.info('rollback');
            },
            commit: function() {
                throw new Error();
            }
        }

        return t;
    };
}


module.exports = {
    doMock,
    doMockError
};
