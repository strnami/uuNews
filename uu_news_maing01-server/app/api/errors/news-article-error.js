"use strict";
const NewsMainUseCaseError = require("./news-main-use-case-error.js");

const Create = {
  UC_CODE: `${NewsMainUseCaseError.ERROR_PREFIX}article/create`,
  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid";
    }
  },
  ArticleDaoCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}articleDaoCreateFailed`;
      this.message = "Create article by article Dao create failed.";
    }
  }
}; 

const List = {
  UC_CODE: `${NewsMainUseCaseError.ERROR_PREFIX}article/list/`,

  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

module.exports = { 
  Create,
  List
};
