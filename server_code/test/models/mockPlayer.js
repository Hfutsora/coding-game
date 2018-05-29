/* eslint-disable */

const mockModel = require('./mockBaseModels').Model;
const SubModel = require('./mockBaseModels').SubModel;

class PlayerMode extends mockModel {
    constructor() {
        const _fields = ['name', 'gender', 'description', 'portrait', 'score', 'stage', 'vip', 'userId'];
        super(_fields);
    }

    build(data) {
        return new SubPlayerModel(data, this._db);
    }
}

class SubPlayerModel extends SubModel {

}

module.exports = {
    PlayerMode,
    SubPlayerModel
}
