/* eslint-disable */

const mockModel = require('./mockBaseModels').Model;
const SubModel = require('./mockBaseModels').SubModel;

class UserMode extends mockModel {
    constructor() {
        const _fields = ['tel', 'passwd'];
        super(_fields);
    }

    build(data) {
        return new SubUserModel(data, this._db);
    }
}

class SubUserModel extends SubModel {

}

module.exports = {
    UserMode,
    SubUserModel
}
