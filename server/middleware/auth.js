const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = function (req, res, next) {
  admin
    .auth()
    .verifyIdToken(req.header("AuthToken"))
    .then((decodedToken) => {
      req.uid = decodedToken.uid;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};
