const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = function (req, res, next) {
  console.log("validating token");
  admin
    .auth()
    .verifyIdToken(req.header.AuthToken)
    .then((decodedToken) => {
      req.decodedToken = decodedToken;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};
