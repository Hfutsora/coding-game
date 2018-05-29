module.exports = function(sequelize, DataTypes) {
    const Collections = sequelize.define('collections', {
        type: {
            type: DataTypes.TINYINT
        }
    }, {
        freezeTableName: true,
        tableName: 'collections',
        timestamps: false
    });

    return Collections;
};
