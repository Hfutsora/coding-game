/* eslint-disable */
const logger = require('ktoolkit').logger.output;

const Datastore = require('nedb');
class Model {
    constructor(fields) {
        this._db = new Datastore();
        this._fields = fields;
    }

    getPromise(operation, query, options) {
        const self = this;
        return new Promise(function(resolve, reject) {
            if (!options) {
                self._db[operation](query, function(err, data) {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            }
            else {
                self._db[operation](query, options, function(err, data) {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                })
            }

        });
    }

    findOneAsync(options) {
        let attributes = [];
        if (options.attributes) {
            attributes = options.attributes;
        } else {
            attributes = this._fields;
        }
        const optionsMore = {};
        attributes.forEach(field => {
            optionsMore[field] = 1;
        });
        if (options.where.id !== undefined) {
            options.where._id = options.where.id;
            delete options.where.id;
        }
        return this.getPromise('findOne', options.where, optionsMore);
    }

    createAsync(options) {
        return this.getPromise('insert', [options.where]);
    }

    async findOne(options) {
        let result = await this.findOneAsync(options);
        if (result) {
            result = this.build(result);
        }
        return result;
    }

    async findOrCreate(options) {
        let result = await this.findOne(options);
        if (!result) {
            result = await this.createAsync(options);
            logger.info(result);
            const resultModel = result.map(one => {
                return this.build(one);
            });
            return resultModel;
        } else {
            return null;
        }
    }

    build(data) {
        return new SubModel(data, this._db);
    }

    remove(options) {
        this._db.remove();
    }
}

class SubModel {
    constructor(data, db) {
        this._db = db;
        this._data = data;
        Object.keys(data).forEach(key => {
            this[key] = data[key];
        });
    }

    getPromise(operation, query, updates, options) {
        const self = this;
        return new Promise(function(resolve, reject) {
            if (updates) {
                self._db[operation](query, updates, options, function(err, data) {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            } else {
                self._db[operation](query, function(err, data) {
                    if (!err) {
                        resolve(data);
                    } else {
                        console.log(err);
                        reject(err);
                    }
                });
            }
        });
    }

    createAsync(options) {
        return this.getPromise('insert', [options]);
    }

    updateAsync(query, data) {
        return this.getPromise('update', query, data, {});
    }

    async save() {
        if (this._data._id) {
            const data = this._data;
            const id = this._data._id;
            delete data._id;
            await this.updateAsync({
                _id: id
            }, data);
        } else {
            const result = await this.createAsync(this._data);
            this._data = result[0];
        }
    }

    get(options) {
        return this._data;
    }
}

module.exports = {
    Model,
    SubModel
}
