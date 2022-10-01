const MongoClient = require("mongodb").MongoClient;

// const connectionString = process.env.MONGODB_URI;
const connectionString = 'mongodb+srv://PushpikaWan:lucefer%401234@carefmcluster.k1puddk.mongodb.net/?retryWrites=true&w=majority';
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