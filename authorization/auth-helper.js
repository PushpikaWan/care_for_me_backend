const admin = require("firebase-admin");

module.exports.isAuthorized = async (req) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader) {
      const idToken = authHeader.split(" ")[1];
      const decodedToken = admin.auth().verifyIdToken(idToken);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

