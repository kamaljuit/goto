const Router = require("express")();
const urlController = require("../controller/urlController");
Router.route("/:shortUrl").get(urlController.redirectUrl);

module.exports = Router;
