module.exports = function(sequelize, DataTypes) {
    const StandardGame = sequelize.define('standardGame', {
        map: {
            type: DataTypes.STRING(255)
        },
        praise: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        img: {
            type: DataTypes.STRING(255)
        },
        tip: {
            type: DataTypes.STRING(255)
        }
    }, {
        freezeTableName: true,
        tableName: 'standardgame',
        timestamps: false
    });

    return StandardGame;
};
