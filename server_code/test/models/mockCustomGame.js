/* eslint-disable */

const mockModel = require('./mockBaseModels').Model;
const SubModel = require('./mockBaseModels').SubModel;

class CustomGameMode extends mockModel {
    constructor() {
        const _fields = ['map', 'runStatus', 'publishStatus', 'praise', 'playerId', 'img'];
        super(_fields);
    }

    build(data) {
        return new SubCustomGameModel(data, this._db);
    }
}

class SubCustomGameModel extends SubModel {

}

module.exports = {
    CustomGameMode,
    SubCustomGameModel
}
