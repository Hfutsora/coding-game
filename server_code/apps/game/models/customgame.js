module.exports = function(sequelize, DataTypes) {
    const CustomGame = sequelize.define('customGame', {
        map: {
            type: DataTypes.STRING(255)
        },
        runStatus: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
        publishStatus: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        img: {
            type: DataTypes.STRING(255)
        },
        people: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        freezeTableName: true,
        tableName: 'customgame',
        timestamps: false
    });

    return CustomGame;
};
