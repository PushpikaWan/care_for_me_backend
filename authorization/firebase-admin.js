const admin = require("firebase-admin");

const {private_key} = JSON.parse(process.env.PRIVATE_KEY_WITH_LABEL);

const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  private_key,
  "client_email": process.env.CLIENT_EMAIL_ADDRESS,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_URI,
  "client_x509_cert_url": process.env.CLIENT_CERTIFCATE_URL
}

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount)))
});