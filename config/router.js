var router = require('express').Router();

var IndexController = require("../controllers/IndexController.js");

router.get('/', IndexController.index);

module.exports = router;
