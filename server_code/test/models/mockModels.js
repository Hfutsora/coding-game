/* eslint-disable */
const PlayerMode = require('./mockPlayer').PlayerMode;
const mockCollections = require('./mockCollections');
const mockCustomGame = require('./mockCustomGame');
const mockPlayer = require('./mockPlayer');
const mockUser = require('./mockUser');
const Model = require('../../apps/game/models/index');
const logger = require('ktoolkit').logger.output;

function playerMock() {
    Model.Player = new PlayerMode();
    Object.assign(mockUser.SubUserModel.prototype, {
        async setPlayer(player) {
            player._data.userId = this._data._id;
            await player.save();
        },
        async getPlayer() {
            const Player = Model.Player;
            const self = this;
            const player = await Player.findOne({
                where: {
                    userId: self._data._id
                }
            });
            return player;
        }
    });
}

function customGameMock() {
    Model.CustomGame = new mockCustomGame.CustomGameMode();
    Model.Collections = new mockCollections.CollectionsMode();
    Object.assign(mockPlayer.SubPlayerModel.prototype, {
        async setCustomGame(customGame) {
            const Collections = Model.Collections;
            const self = this;
            await Collections.findOrCreate({
                where: {
                    type: 0,
                    playerId: self._data._id,
                    customGameId: customGame._data._id
                }
            });
        },
        async getCustomGames() {
            const CustomGame = Model.CustomGame;
            const Collections = Model.Collections;
            const self = this;
            let collectionsRaw = await Collections.findOne({
                where: {
                    playerId: self._data._id
                }
            });
            collectionsRaw = [collectionsRaw];
            const collections = [];
            for (let i = 0; i < collectionsRaw.length; i++) {
                const temp = await CustomGame.findOne({
                    where: {
                        _id: collectionsRaw[i].customGameId
                    }
                });
                temp.collections = collectionsRaw[i];
                collections.push(temp);
            }
            return collections;
        }
    });
}

function userMock() {
    Model.User = new mockUser.UserMode();
}

module.exports = {
    playerMock,
    userMock,
    customGameMock
};
