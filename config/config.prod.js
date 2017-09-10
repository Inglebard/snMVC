var	fs = require('fs');

module.exports = {
	mode: 'prod',
	http :
	{		
		port: 4000,
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
