const Router = require("express")();
const urlController = require("../controller/urlController");
const authController = require("../controller/authController");
Router.route("/")
  .get(authController.protect, urlController.getUrlList)
  .post(authController.protect, urlController.addUrl);

module.exports = Router;
