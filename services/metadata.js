const common = require("../util/common");
const {getPostCollection} = require("../db/db-config");
const {STATE_ACTIVE} = require("../util/constants");

/**
 * @param {Object} options
 * @param {String} options.userId User Id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getUserPostMetaData = async (options) => {
  try {
    const postCollection = await getPostCollection();
    const ownedPostCount = await postCollection.countDocuments(
        {'userLite.userId': options.userId, status: STATE_ACTIVE});
    const interactedPostCount = await postCollection.countDocuments(
        {'comments.userLite.userId': options.userId, status: STATE_ACTIVE});
    return {
      status: 200,
      data: {ownedPostCount, interactedPostCount}
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

