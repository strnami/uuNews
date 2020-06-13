"use strict";
const NewsMainUseCaseError = require("./news-main-use-case-error.js");

const Create = {
  UC_CODE: `${NewsMainUseCaseError.ERROR_PREFIX}newspaper/create`,
  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid";
    }
  },
  NewspaperDaoCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newspaperDaoCreateFailed`;
      this.message = "Create newspaper by newspaper Dao create failed.";
    }
  }
}; 

const Update = {
  UC_CODE: `${NewsMainUseCaseError.ERROR_PREFIX}newspaper/update`,
  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserNotAuthorized: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  NewspaperDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newspaperDoesNotExist`;
      this.message = "newspaper does not exist.";
    }
  },
  UuBinaryCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuBinaryCreateFailed`;
      this.message = "Creating uuBinary failed.";
    }
  },
  UuBinaryUpdateBinaryDataFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuBinaryUpdateBinaryDataFailed`;
      this.message = "Updating uuBinary data failed.";
    }
  },
  NewspaperDaoUpdateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newspaperDaoUpdateFailed`;
      this.message = "Update newspaper by newspaper Dao update failed.";
    }
  }
};


module.exports = { 
  Create,
  Update
};
