"use strict";
const NewsMainAbl = require("../../abl/news-main-abl.js");

class NewsMainController {
  init(ucEnv) {
    return NewsMainAbl.init(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new NewsMainController();
