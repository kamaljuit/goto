const router = require("express").Router();
const {
  getAllUsers,
  updateUserSubscription
} = require("../controller/userController");
const authController = require("../controller/authController");
//Diable these admin routes before deploying
router
  .route("/")
  .get(authController.protect, getAllUsers)
  .patch(authController.protect, updateUserSubscription);

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signUp);
router.route("/logout").get(authController.logout);
router.route("/auth/:provider").get(authController.providerAuth);

// router.route('/auth/activate/:token').get(authController.activate);
module.exports = router;
