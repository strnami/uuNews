"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class NewsTopicMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
    await super.createIndex({awid: 1, visibility: 1});
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    let filter = {
      awid: awid,
      id: id
    };
    return await super.findOne(filter);
  }

  async listByVisibility(awid, visibility, pageInfo = {}) {
      return await super.find({awid, visibility}, pageInfo);
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async remove(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id
    };
    return await super.deleteOne(filter);
  }
}

module.exports = NewsTopicMongo;
