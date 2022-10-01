const {getPostCursor, getPostCollection} = require("../db/db-config");
const common = require("../util/common");
const {STATE_ACTIVE} = require("../util/constants");

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getAllPosts = async (options) => {
  try {
    const postCursor = await getPostCursor();
    const posts = await postCursor.sort({modifiedAt: -1}).limit(
        options.pageSize).skip(options.pageSize * options.page).toArray();
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
    const postCollection = await getPostCollection();
    const post = {...options.body, status: STATE_ACTIVE}
    const inserted = await postCollection.insertOne(
        common.getPreProcessedDataBeforeSave(post));
    return {
      status: 200,
      data: inserted
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

