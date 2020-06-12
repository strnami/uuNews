// "use strict";
// const { Validator } = require("uu_appg01_server").Validation;
// const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
// const { ValidationHelper } = require("uu_appg01_server").AppServer;
// const { SysProfileModel } = require("uu_appg01_server").Workspace;
// const Errors = require("../api/errors/news-newspaper-error.js");

// const WARNINGS = {
//     updateNewspaperDoesNotExist: {
//         code: `${Errors.Update.UC_CODE}newspaperDoesNotExist`,
//         message: "One or more newspapers with given categoryId do not exist."
//       }
// };

// const AUTHORITIES_PROFILE = "Authorities";

// class NewsArticleAbl {
//   constructor() {
//     this.validator = Validator.load();
//     //get DAO for article objects
//     this.dao = DaoFactory.getDao("article");
//   }


//   async update(awid, dtoIn, session, authorizationResult) {
//     // hds 1, A1, hds 1.1, A2
//     // await JokesInstanceAbl.checkInstance(
//     //   awid,
//     //   Errors.Update.JokesInstanceDoesNotExist,
//     //   Errors.Update.JokesInstanceNotInProperState
//     // );

//     // hds 2, 2.1
//     let validationResult = this.validator.validate("newspaperUpdateDtoInType", dtoIn);
//     // hds 2.2, 2.3, A3, A4
//     let uuAppErrorMap = ValidationHelper.processValidationResult(
//       dtoIn,
//       validationResult,
//       WARNINGS.updateUnsupportedKeys.code,
//       Errors.Update.InvalidDtoIn
//     );

//     // hds 3
//     let joke = await this.dao.get(awid, dtoIn.id);
//     // A5
//     if (!joke) {
//       throw new Errors.Update.JokeDoesNotExist({ uuAppErrorMap }, { jokeId: dtoIn.id });
//     }

//     // hds 4
//     let uuId = session.getIdentity().getUuIdentity();
//     // A6
//     if (
//       uuId !== joke.uuIdentity &&
//       !authorizationResult.getAuthorizedProfiles().includes(JokesInstanceAbl.AUTHORITIES)
//     ) {
//       throw new Errors.Update.UserNotAuthorized({ uuAppErrorMap });
//     }

//     // hds 5
//     if (dtoIn.categoryList) {
//       let presentCategories = await this._checkCategoriesExistence(awid, dtoIn.categoryList);
//       // A7
//       if (dtoIn.categoryList.length > 0) {
//         ValidationHelper.addWarning(
//           uuAppErrorMap,
//           WARNINGS.updateNewspaperDoesNotExist.code,
//           WARNINGS.updateNewspaperDoesNotExist.message,
//           { categoryList: [...new Set(dtoIn.categoryList)] }
//         );
//       }
//       dtoIn.categoryList = [...new Set(presentCategories)];
//     }

//     // hds 6
//     if (dtoIn.image) {
//       let binary;
//       if (!joke.image) {
//         // hds 6.1
//         try {
//           binary = await UuBinaryAbl.createBinary(awid, { data: dtoIn.image });
//         } catch (e) {
//           // A8
//           throw new Errors.Update.UuBinaryCreateFailed({ uuAppErrorMap }, e);
//         }
//       } else {
//         // hds 6.2
//         try {
//           binary = await UuBinaryAbl.updateBinaryData(awid, {
//             data: dtoIn.image,
//             code: joke.image,
//             revisionStrategy: "NONE"
//           });
//         } catch (e) {
//           // A9
//           throw new Errors.Update.UuBinaryUpdateBinaryDataFailed({ uuAppErrorMap }, e);
//         }
//       }
//       dtoIn.image = binary.code;
//     }

//     // hds 7
//     try {
//       dtoIn.awid = awid;
//       joke = await this.dao.update(dtoIn);
//     } catch (e) {
//       if (e instanceof ObjectStoreError) {
//         // A10
//         throw new Errors.Update.JokeDaoUpdateFailed({ uuAppErrorMap }, e);
//       }
//       throw e;
//     }

//     // hds 8
//     joke.uuAppErrorMap = uuAppErrorMap;
//     return joke;
//   }


// }

// module.exports = new NewsArticleAbl();
