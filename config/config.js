var config = {
    dev: './config.dev.js' ,
    prod: './config.prod.js'
}

module.exports = function(mode) {
	var config_mode = mode || process.argv[2] || 'dev'

	if (config[config_mode])
	{
		return require(config[config_mode]);
	}
	else
	{
		return require(config['dev']);
	}
}
