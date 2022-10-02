const {getUserCollection} = require('../db/db-config');
const common = require('../util/common');
const {ObjectId} = require("mongodb");
const {STATE_ACTIVE} = require("../util/constants");
const {convertIdBeforeSendingObject} = require("../util/common");

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.saveUser = async (options) => {
  try {
    const userCollection = await getUserCollection();
    const user = {...options.body, status: STATE_ACTIVE};
    const inserted = await userCollection.insertOne(
        common.getPreProcessedDataBeforeSave(user));
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
module.exports.getUser = async (options) => {

  try {
    const userCollection = await getUserCollection();
    const user = await userCollection.findOne(
        {_id: new ObjectId(options.userId), 'status': STATE_ACTIVE});
    if(!user){
      return {
        status: 204,
        data: null
      };
    }
    return {
      status: 200,
      data: convertIdBeforeSendingObject(user)
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
    const userCollection = await getUserCollection();
    let body = options.body;
    const filter = {_id: new ObjectId(body.id)};
    const updatingDoc = {
      $set: common.getPreProcessedDataBeforeUpdate({
        "name": body.name,
        "imageUrl": body.imageUrl
      })
    }
    let updateResult = await userCollection.updateOne(filter, updatingDoc);
    return {
      status: 200,
      data: updateResult
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

