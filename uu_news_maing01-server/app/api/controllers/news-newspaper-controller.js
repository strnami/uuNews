"use strict";

const NewspaperAbl = require("../../abl/news-newspaper-abl.js");

class NewsNewspaperController {

  static update(ucEnv) {
    return NewspaperAbl.update(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

}

module.exports = NewsNewspaperController;
