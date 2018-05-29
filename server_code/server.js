const kexpress = require('kexpress');
const kexpressHttp = require('kexpress-http');
kexpressHttp.load(kexpress);
const serverConfig = require('./config/server');
const Server = kexpress.core.server.Server;
const GameApplication = require('./apps/game/app').Application;

const gameServer = new Server(GameApplication, serverConfig.game);

gameServer.start();

module.exports = {
    gameServer
};
