const dbConfig = require('../db/db-config');
const common = require('../util/common');
const {ObjectId} = require("mongodb");

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.saveUser = async (options) => {
  try {
    let db = await dbConfig.getDB();
    const user = db.collection('UserData');
    const inserted = await user.insertOne(
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
    let db = await dbConfig.getDB();
    const user = db.collection('UserData');
    let body = options.body;
    const filter = {_id: new ObjectId(body.id)};
    const updatedDoc = {
      $set: {
        "name": body.name,
        "imageUrl": body.imageUrl,
        "modifiedAt": body.modifiedAt
      }
    }
    await user.updateOne(filter, updatedDoc);
    return {
      status: 200,
      data: body
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

