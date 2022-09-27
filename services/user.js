const dbConfig = require('../db/db-config');
const ServerError = require(
    "swagger-node-codegen/templates/express-server/src/lib/error");

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.saveUser = async (options) => {
//todo need common validator to all post, update, delete..
  try {
    let db = await dbConfig.getDB();
    const user = db.collection('UserData');
    await user.insertOne(options.body);
    console.log('users', options.body);
    return {
      status: 200,
      data: options.body
    };
  } catch (e) {
    console.error("user data saving failed", e);
    throw new ServerError({
      status: 500,
      error: e.message()
    });
  }
};

/**
 * @param {Object} options
 * @param {String} options.userId user id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.editUser = async (options) => {
  return {
    status: 200,
    data: 'editUser ok!'
  };
};

