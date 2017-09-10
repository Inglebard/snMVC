"use strict";
class IndexController {
	static index (req,res,next) {
		res.render('index', { title: 'Express'});
	}
}

module.exports = IndexController;
