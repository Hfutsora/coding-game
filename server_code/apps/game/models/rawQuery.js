const getSequelize = require('../../../models/getSequelize').getSequelize;
const sequelize = getSequelize();

const query = async function(rawSql, options) {
    options.type = sequelize.QueryTypes.SELECT;
    const result = await sequelize.query(rawSql, options);

    return result;
};

module.exports = {
    query
};
