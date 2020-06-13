"use strict";

const NewsTopicAbl = require("../../abl/news-topic-abl.js");

class NewsArticleController {
  static create(ucEnv) {
    return NewsTopicAbl.create(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  static delete(ucEnv) {
    return NewsTopicAbl.delete(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }
}

module.exports = NewsArticleController;
