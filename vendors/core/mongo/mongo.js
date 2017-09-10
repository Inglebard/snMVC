var MongoClient = require('mongodb').MongoClient;


module.exports.init = function(app,data_app,next)
{
  var database_config = data_app.database_config_pnt;
  MongoClient.connect(database_config.url, function(err, db) {
  	if(err) {
  		console.log('Sorry, there is no mongo db server running.');
  	} else {
      var db_app = {};
      db_app.config = database_config;
      db_app.db = db;
      app.get('databases')[database_config.database_name]=db_app;
      next(app,data_app,next);
  	}
  });
}
