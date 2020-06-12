"use strict";

const ArticleAbl = require("../../abl/news-article-abl.js");

class NewsArticleController {
  static create(ucEnv) {
    return ArticleAbl.create(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  static list(ucEnv) {
    return ArticleAbl.list(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }
}

module.exports = NewsArticleController;
