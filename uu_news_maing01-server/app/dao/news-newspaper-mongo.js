"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class NewsNewspaperMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
    await super.createIndex({awid: 1, visibility: 1});
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

}

module.exports = NewsNewspaperMongo;
