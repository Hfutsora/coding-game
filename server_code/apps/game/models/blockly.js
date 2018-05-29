module.exports = function(sequelize, DataTypes) {
    const Blockly = sequelize.define('blockly', {
        name: {
            type: DataTypes.STRING(45)
        }
    }, {
        freezeTableName: true,
        tableName: 'blockly',
        timestamps: false
    });

    return Blockly;
};
