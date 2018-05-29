module.exports = function(sequelize, DataTypes) {
    const Turtle = sequelize.define('turtle', {
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
        tableName: 'turtle',
        timestamps: false
    });

    return Turtle;
};
