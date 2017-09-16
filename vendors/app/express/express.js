var	path = require('path');
var	express = require('express');

module.exports.init = function(app,data_app,next)
{
  app.set('views',path.join(data_app.root, 'views'));
  app.set('view engine', 'ejs');
  app.use(express.static(path.join(data_app.root, 'public')));
  if(data_app.config.http)
  {
  	app.set('port', data_app.config.http.port);
  }
  if(data_app.config.https)
  {
  	app.set('port_https', data_app.config.https.port);
  }
  app.set('data_app', data_app);
  next();
}
