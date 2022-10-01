const dbConfig = require("../db/db-config");
const common = require("../util/common");
const {ObjectId} = require("mongodb");

async function getCollection() {
  let db = await dbConfig.getDB();
  return db.collection('Post');
}

/**
 * @param {Object} options
 * @param {String} options.postId post id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getPost = async (options) => {
  try {
    const postCollection = await getCollection();
    const post = await postCollection
    .findOne({_id: new ObjectId(options.postId)});
    console.log(post);
    return {
      status: 200,
      data: post
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

/**
 * @param {Object} options
 * @param {String} options.postId post id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updatePost = async (options) => {

  try {
    const post = await getCollection();
    let body = options.body;
    const filter = {_id: new ObjectId(options.postId)};
    const updatingDoc = {
      $set: common.getPreProcessedDataBeforeUpdate({
        "name": body.name,
        "imageUrl": body.imageUrl,
        "animalType": body.animalType,
        "animalNeed": body.animalNeed,
        "district": body.district,
        "addressText": body.addressText,
        "locationLink": body.locationLink,
        "description": body.description,
      })
    }
    let updateResult = await post.updateOne(filter, updatingDoc);
    return {
      status: 200,
      data: updateResult
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

/**
 * @param {Object} options
 * @param {String} options.postId post id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deletePost = async (options) => {
  try {
    const post = await getCollection();
    const filter = {_id: new ObjectId(options.postId)};

    let deleteResult = await post.deleteOne(filter);
    return {
      status: 200,
      data: deleteResult
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

/**
 * @param {Object} options
 * @param {String} options.postId post id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addComment = async (options) => {
  try {
    const post = await getCollection();
    let comment = options.body;
    const filter = {_id: new ObjectId(options.postId)};
    const updatingDoc = {
      $push: {
        comments: common.getPreProcessedDataBeforeSave({
          ...comment,
          _id: new ObjectId()
        })
      }
    }
    let updateResult = await post.updateOne(filter, updatingDoc);
    return {
      status: 200,
      data: updateResult
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

/**
 * @param {Object} options
 * @param {String} options.postId post id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteComment = async (options) => {
  try {
    const post = await getCollection();
    const filter = {_id: new ObjectId(options.postId)};
    const updatingDoc = {
      $pull: {
        comments: {'_id': new ObjectId(options.commentId)}
      }
    }
    let updateResult = await post.updateOne(filter, updatingDoc);
    return {
      status: 200,
      data: updateResult
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

/**
 * @param {Object} options
 * @param {String} options.postId post id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.reportPost = async (options) => {
  try {
    const post = await getCollection();
    let report = options.body;
    const filter = {_id: new ObjectId(options.postId)};
    const updatingDoc = {
      $push: {
        reports: common.getPreProcessedDataBeforeSave({
          ...report
        })
      }
    }
    let updateResult = await post.updateOne(filter, updatingDoc);
    return {
      status: 200,
      data: updateResult
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};

/**
 * @param {Object} options
 * @param {String} options.postId post id
 * @param {String} options.commentId comment id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.reportComment = async (options) => {
  try {
    const post = await getCollection();
    let report = options.body;
    const filter = {_id: new ObjectId(options.postId)};
    const updatingDoc = {
      $push: {
        'comments.reports': common.getPreProcessedDataBeforeSave({
          ...report
        })
      }
    }
    let updateResult = await post.updateOne(filter, updatingDoc);
    return {
      status: 200,
      data: updateResult
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
module.exports.getPostsByUser = async (options) => {
  try {
    const postCollection = await getCollection();
    let query = options.query;
    const post = await postCollection
    .find({userId: new ObjectId(options.userId)}).limit(query.pageSize).skip(
        query.pageSize * query.page).toArray();
    console.log(post);
    return {
      status: 200,
      data: post
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};