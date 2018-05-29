module.exports = function(sequelize, DataTypes) {
    const Player = sequelize.define('player', {
        name: {
            type: DataTypes.STRING(45)
        },
        gender: {
            type: DataTypes.STRING(4),
            defaultValue: '男'
        },
        description: {
            type: DataTypes.STRING(45)
        },
        portrait: {
            type: DataTypes.STRING(100)
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        stage: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        vip: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    }, {
        freezeTableName: true,
        tableName: 'player',
        timestamps: false
    });

    return Player;
};
