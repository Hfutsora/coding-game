module.exports = function (sequelize, DataTypes) {
    const Recharge = sequelize.define('recharge', {
        tradeNo: {
            type: DataTypes.STRING(32)
        },
        ammount: {
            type: DataTypes.DECIMAL(10, 2)
        },
        timestampStart: {
            type: DataTypes.STRING(20)
        },
        timestampEnd: {
            type: DataTypes.STRING(20)
        },
        tradeNo: {
            type: DataTypes.STRING(64)
        },
        status: {
            type: DataTypes.STRING(45)
        }
    }, {
        freezeTableName: true,
        tableName: 'recharge',
        timestamps: false
    });

    return Recharge;
};
