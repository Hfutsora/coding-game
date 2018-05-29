module.exports = function(sequelize, DataTypes) {
    const Leave = sequelize.define('leave', {
        x: {
            type: DataTypes.INTEGER
        },
        y: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true,
        tableName: 'leave',
        timestamps: false
    });

    return Leave;
};
