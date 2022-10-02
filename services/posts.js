const {getPostCollection, getPostCursor} = require("../db/db-config");
const common = require("../util/common");
const {ObjectId} = require("mongodb");
const {STATE_ACTIVE} = require("../util/constants");
const {convertIdBeforeSendingArray, convertIdBeforeSendingObject} = require(
    "../util/common");

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
      data: convertIdBeforeSendingArray(posts)
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


/**
 * @param {Object} options
 * @param {String} options.postId post id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getPost = async (options) => {
  try {
    let postCollection = await getPostCollection();
    const post = await postCollection.findOne(
        {_id: new ObjectId(options.postId), 'status': STATE_ACTIVE});
    return {
      status: 200,
      data: convertIdBeforeSendingObject(post)
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
    let postCollection = await getPostCollection();
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
    let updateResult = await postCollection.updateOne(filter, updatingDoc);
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
    const postCollection = await getPostCollection();
    const filter = {_id: new ObjectId(options.postId)};

    let deleteResult = await postCollection.deleteOne(filter);
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
    const postCollection = await getPostCollection();
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
    let updateResult = await postCollection.updateOne(filter, updatingDoc);
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
    const postCollection = await getPostCollection();
    const filter = {_id: new ObjectId(options.postId)};
    const updatingDoc = {
      $pull: {
        comments: {'_id': new ObjectId(options.commentId)}
      }
    }
    let updateResult = await postCollection.updateOne(filter, updatingDoc);
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
    const postCollection = await getPostCollection();
    let report = options.body;
    const filter = {_id: new ObjectId(options.postId)};
    const updatingDoc = {
      $push: {
        reports: common.getPreProcessedDataBeforeSave({
          ...report
        })
      }
    }
    let updateResult = await postCollection.updateOne(filter, updatingDoc);
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
    const postCollection = await getPostCollection();
    let report = options.body;
    const filter = {_id: new ObjectId(options.postId)};
    const updatingDoc = {
      $push: {
        'comments.$[comment].reports': common.getPreProcessedDataBeforeSave({
          ...report
        })
      }
    }
    let updateResult = await postCollection.findOneAndUpdate(filter,
        updatingDoc, {
          arrayFilters: [{'comment._id': new ObjectId(options.commentId)}],
          new: true
        });
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
    const postCollection = await getPostCollection();
    let findCursor = postCollection.find(
        {userId: options.userId, status: STATE_ACTIVE});

    if (options.includeInteraction) {
      findCursor = postCollection.find({
        status: STATE_ACTIVE,
        $or: [{userId: options.userId}, {'comments.userId': options.userId}]
      });
    }

    const post = await findCursor
    .sort({modifiedAt: -1})
    .limit(options.pageSize).skip(options.pageSize * options.page).toArray();
    return {
      status: 200,
      data: convertIdBeforeSendingArray(post)
    };
  } catch (e) {
    return common.getErrorResponse(500, e);
  }
};