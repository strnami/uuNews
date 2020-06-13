"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { SysProfileModel } = require("uu_appg01_server").Workspace;
const Errors = require("../api/errors/news-newspaper-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  }
};

const AUTHORITIES_PROFILE = "Authorities";

class NewsNewspaperAbl {
  constructor() {
    this.validator = Validator.load();
    //get DAO for article objects
    this.dao = DaoFactory.getDao("newspaper");
  }

  async create(awid, dtoIn, session, authorizationResult) {
    // hds 1.1
    let validationResult = this.validator.validate("newspaperCreateDtoInType", dtoIn);

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
        throw new Errors.Create.NewspaperDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e; 
    }

    //hds 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async update(awid, dtoIn, session, authorizationResult) {
    // hds 1.1
    let validationResult = this.validator.validate("newspaperUpdateDtoInType", dtoIn);
    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );
     // hds 3
     let newspaper = await this.dao.get(awid, dtoIn.id);
     // A5
     if (!newspaper) {
       throw new Errors.Update.NewspaperDoesNotExist({ uuAppErrorMap }, { newspaperId: dtoIn.id });
     }
     // hds 4
    let uuId = session.getIdentity().getUuIdentity();
 
    try {
      dtoIn.awid = awid;
      newspaper = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A10
        throw new Errors.Update.NewspaperDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 8
    newspaper.uuAppErrorMap = uuAppErrorMap;
    return newspaper;
  }
}

module.exports = new NewsNewspaperAbl();
