var router = require('express').Router();

var IndexController = require("../controllers/IndexController.js");

module.exports.init = function(app,data_app,next)
{
	router.get('/', IndexController.index);
  app.use('/', router);
	next();
}
