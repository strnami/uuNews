"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { SysProfileModel } = require("uu_appg01_server").Workspace;
const Errors = require("../api/errors/news-topic-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  }
};

const AUTHORITIES_PROFILE = "Authorities";

class NewsTopicAbl {
  constructor() {
    this.validator = Validator.load();
    //get DAO for topic objects
    this.dao = DaoFactory.getDao("topic");
  }

  async create(awid, dtoIn, session, authorizationResult) {
    // hds 1.1
    let validationResult = this.validator.validate("topicCreateDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    // hds 2
    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(AUTHORITIES_PROFILE);

    //hds 3
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();
    
      // hds 4
    dtoIn.awid = awid;
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) { //A3
        throw new Errors.Create.TopicDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e; 
    }

    //hds 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, dtoIn, session, authorizationResult) {
    
    // hds 1, 1.1
    let validationResult = this.validator.validate("topicDeleteDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // hds 3
    let topic = await this.dao.get(awid, dtoIn.id);
    // A5
    if (!topic) {
      throw new Errors.Delete.TopicDoesNotExist({ uuAppErrorMap }, { topicId: dtoIn.id });
    }
    // hds 4
    await this.dao.remove(awid, dtoIn.id);

    // hds 5
    return { uuAppErrorMap };
  }
}

module.exports = new NewsTopicAbl();
