const common = require("../util/common");
const dbConfig = require("../db/db-config");
/**
 * @param {Object} options
 * @param {String} options.userId User Id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getUserPostMetaData = async (options) => {
  try {
    let db = await dbConfig.getDB();
    const posts = await db.collection('Post');
    const ownedPostCount = await posts.countDocuments({userId: options.userId});
    const interactedPostCount = await posts.countDocuments(
        {'comments.userId': options.userId});
    return {
      status: 200,
      data: {ownedPostCount, interactedPostCount}
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

