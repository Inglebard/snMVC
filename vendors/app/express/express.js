var	path = require('path');
var	express = require('express');

module.exports.init = function(app,data_app,next)
{  
  app.set('views',path.join(data_app.root, 'views'));
  app.set('view engine', 'ejs');
  app.use(express.static(path.join(data_app.root, 'public')));
  app.set('port', data_app.port);
  app.set('data_app', data_app);
  next();
}
