module.exports = function(sequelize, DataTypes) {
    const Frog = sequelize.define('frog', {
        x: {
            type: DataTypes.INTEGER
        },
        y: {
            type: DataTypes.INTEGER
        },
        direction: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true,
        tableName: 'frog',
        timestamps: false
    });

    return Frog;
};
