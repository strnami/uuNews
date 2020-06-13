"use strict";
const NewsMainUseCaseError = require("./news-main-use-case-error.js");

const Create = {
  UC_CODE: `${NewsMainUseCaseError.ERROR_PREFIX}topic/create`,
  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid";
    }
  },
  TopicDaoCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDaoCreateFailed`;
      this.message = "Create topic by topic Dao create failed.";
    }
  }
}; 

const Delete = {
  UC_CODE: `${NewsMainUseCaseError.ERROR_PREFIX}topic/delete`,
  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TopicDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}topicDoesNotExist`;
      this.message = "Topic does not exist.";
    }
  }
};



module.exports = { 
  Create,
  Delete
};
