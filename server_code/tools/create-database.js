const sequelize = require('../models/getSequelize').getSequelize();

const path = '../apps/game/models/';
const User = sequelize.import(`${path}user.js`);
const Player = sequelize.import(`${path}player.js`);
const CustomGame = sequelize.import(`${path}customgame.js`);
const StandardGame = sequelize.import(`${path}standardgame.js`);
const Blockly = sequelize.import(`${path}blockly.js`);
const Recharge = sequelize.import(`${path}recharge.js`);
sequelize.import(`${path}star.js`);
sequelize.import(`${path}collections.js`);
const Frog = sequelize.import(`${path}frog.js`);
const Turtle = sequelize.import(`${path}turtle.js`);
const Leave = sequelize.import(`${path}leave.js`);

const logger = require('ktoolkit').logger.output;

async function main() {
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

    await sequelize.sync({
        force: true
    });

    logger.info('Created database successfully');

    await sequelize.close();
}

main();
