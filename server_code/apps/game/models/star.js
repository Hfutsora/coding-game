module.exports = function(sequelize, DataTypes) {
    const Star = sequelize.define('star', {
        star: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true,
        tableName: 'star',
        timestamps: false
    });

    return Star;
};
