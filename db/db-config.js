const MongoClient = require("mongodb").MongoClient;

const connectionString = process.env.MONGODB_URI;
const dbName = 'CARE_FOR_ME_DEV';

module.exports.getDB = async () => {
  try {
    const mongoClient = await MongoClient.connect(connectionString);
    console.log('Connected to Database');
    return mongoClient.db(dbName);
  } catch (e) {
    console.error(e);
    throw e;
  }
}