const dbConfig = require('../db/db-config');
const error = require('../util/ErrorResponseCreator');

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.saveUser = async (options) => {
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
    return error.getErrorResponse(500, e);
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

