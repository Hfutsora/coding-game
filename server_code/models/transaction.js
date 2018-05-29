const sequelize = require('./getSequelize').getSequelize();

const transaction = async function() {
    try {
        const result = await sequelize.transaction();

        return result;
    }
    catch (e) {
        throw e;
    }
};

module.exports = {
    transaction
};
