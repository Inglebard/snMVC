module.exports = {
	mode: 'dev',
	port: 3000,
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
