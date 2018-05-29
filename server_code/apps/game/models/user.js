module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('user', {
        tel: {
            type: DataTypes.STRING(45)
        },
        passwd: {
            type: DataTypes.STRING(45)
        }
    }, {
        freezeTableName: true,
        tableName: 'user',
        timestamps: false
    });

    return User;
};
