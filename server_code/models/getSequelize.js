const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

let sequelize = null;

function getSequelize() {
    if (sequelize === null) {
        const database = databaseConfig.database;
        sequelize = new Sequelize(
            database.database,
            database.username,
            database.password,
            {
                host: database.host,
                dialect: database.dialect,
                pool: databaseConfig.pool
            }
        );
    }

    return sequelize;
}

module.exports = {
    getSequelize: getSequelize
};
