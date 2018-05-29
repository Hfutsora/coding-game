/* eslint-disable */

const mockModel = require('./mockBaseModels').Model;
const SubModel = require('./mockBaseModels').SubModel;

class CollectionsMode extends mockModel {
    constructor() {
        const _fields = ['type', 'playerId', 'customGameId'];
        super(_fields);
    }

    build(data) {
        return new SubCollectionsModel(data, this._db);
    }
}

class SubCollectionsModel extends SubModel {

}

module.exports = {
    CollectionsMode,
    SubCollectionsModel
}
