"use strict";

const NewsTopicAbl = require("../../abl/news-topic-abl.js");

class NewsTopicController {
  
  static delete(ucEnv) {
    return NewsTopicAbl.delete(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }
}

module.exports = NewsTopicController;
