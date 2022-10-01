const dbConfig = require("../db/db-config");
const common = require("../util/common");
/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getAllPosts = async (options) => {
  try {
    let db = await dbConfig.getDB();
    const posts = await db.collection('Post')
    .find({}).sort({modifiedAt: -1}).limit(options.pageSize).skip(
        options.pageSize * options.page).toArray();
    return {
      status: 200,
      data: posts
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.savePost = async (options) => {
  try {
    let db = await dbConfig.getDB();
    const post = db.collection('Post');
    const inserted = await post.insertOne(
        common.getPreProcessedDataBeforeSave(options.body));
    return {
      status: 200,
      data: inserted
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

