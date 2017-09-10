var config = {
    dev: require('./config.dev.js') ,
    prod: require('./config.prod.js')

}

module.exports = function(mode) {
    return config[mode || process.argv[2] || 'dev'] || config.dev;
}
