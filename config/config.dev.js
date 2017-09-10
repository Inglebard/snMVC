var	fs = require('fs');

module.exports = {
	mode: 'dev',
	http :
	{		
		port: 3000,
	},
	pre_app: [
	],
	databases : [
	],
	in_app : {
		pre_routing : [
			"./vendors/app/express/express.js",			
		],
		post_routing : [
		],
	},
	post_app: [
	]
}
