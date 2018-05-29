const ktoolkit = require('ktoolkit');
const logger = ktoolkit.logger.output;
const errors = require('../config/errors');

async function errorHandler(req, res, error) {
    logger.error(error);

    throw new errors.FieldsError(error);
}

module.exports = {
    errorHandler: errorHandler
};
