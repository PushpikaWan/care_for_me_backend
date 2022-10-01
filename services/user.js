const {getUserCursor} = require('../db/db-config');
const common = require('../util/common');
const {ObjectId} = require("mongodb");

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.saveUser = async (options) => {
  try {
    const userCursor = await getUserCursor();
    const inserted = await userCursor.insertOne(
        common.getPreProcessedDataBeforeSave(options.body));
    return {
      status: 200,
      data: inserted
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

/**
 * @param {Object} options
 * @param {String} options.userId user id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.editUser = async (options) => {
  try {
    const userCursor = await getUserCursor();
    let body = options.body;
    const filter = {_id: new ObjectId(body.id)};
    const updatingDoc = {
      $set: common.getPreProcessedDataBeforeUpdate({
        "name": body.name,
        "imageUrl": body.imageUrl
      })
    }
    let updateResult = await userCursor.updateOne(filter, updatingDoc);
    return {
      status: 200,
      data: updateResult
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

