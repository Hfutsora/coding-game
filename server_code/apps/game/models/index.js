const sequelize = require('../../../models/getSequelize').getSequelize();
const User = sequelize.import('./user.js');
const Player = sequelize.import('./player.js');
const CustomGame = sequelize.import('./customgame.js');
const StandardGame = sequelize.import('./standardgame.js');
const Blockly = sequelize.import('./blockly.js');
const Star = sequelize.import('./star.js');
const Collections = sequelize.import('./collections.js');
const Recharge = sequelize.import('./recharge.js');
const Frog = sequelize.import('./frog.js');
const Turtle = sequelize.import('./turtle.js');
const Leave = sequelize.import('./leave.js');

User.hasOne(Player);
Player.belongsToMany(StandardGame, {
    through: 'star',
    timestamps: false
});
Player.belongsToMany(CustomGame, {
    through: 'collections',
    timestamps: false
});
Player.hasMany(CustomGame, { as: 'selfGames' });
Player.hasMany(Recharge);
StandardGame.belongsToMany(Blockly, {
    through: 'stanblockly',
    timestamps: false
});
CustomGame.belongsToMany(Blockly, {
    through: 'customblockly',
    timestamps: false
});
StandardGame.hasOne(Frog);
CustomGame.hasOne(Frog);
StandardGame.hasOne(Turtle);
CustomGame.hasOne(Turtle);
StandardGame.hasMany(Leave);
CustomGame.hasMany(Leave);

module.exports = {
    User,
    Player,
    CustomGame,
    StandardGame,
    Blockly,
    Star,
    Collections,
    Recharge,
    Frog,
    Turtle,
    Leave
};
