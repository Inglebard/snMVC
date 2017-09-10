var express = require('express');
var	http = require('http');
var	config = require('./config/config.js')();
var	app = express();

/**
 * Normalize a port into a number, string, or false.
 */


var data_app = {};

data_app.root = __dirname;
data_app.port = normalizePort(config.port || process.env.PORT || '3000');
data_app.config = config;
data_app.count = 0;

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

var execPreApp = function ()
{
  next=execPreApp;
  if (data_app.count >= data_app.config.pre_app.length)
  {
      data_app.count = 0;
      execDatabases();
  }
  else
  {
    var pre_app = require(data_app.config.pre_app[data_app.count]);
    data_app.count++;
    pre_app.init(app,data_app,next);
  }
}


var execDatabases = function ()
{

  if(!data_app.database_config_pnt)
  {
    data_app.database_config_pnt={};
  }
  next = execDatabases;

  if (data_app.count >= data_app.config.databases.length)
  {
      data_app.count=0;
      data_app.database_config_pnt={};
      execInAppPreRouting();
  }
  else
  {
    var database_config = data_app.config.databases[data_app.count];

    if(!app.get('databases'))
    {
      app.set('databases',{});
    }
    data_app.database_config_pnt=database_config;
    var database = require(database_config.init_file);
    data_app.count++;
    database.init(app,data_app,next);
  }
}



var execInAppPreRouting = function ()
{
    next=execInAppPreRouting;
    if (data_app.count >= data_app.config.in_app.pre_routing.length)
    {
        data_app.count = 0;
        execRouting();
    }
    else
    {
      var in_app_pre = require(data_app.config.in_app.pre_routing[data_app.count]);
      data_app.count++;
      in_app_pre.init(app,data_app,next);
    }
}

var execRouting = function ()
{
  app.use('/', require('./config/router.js'));
  execInAppPostRouting();
}

var execInAppPostRouting = function ()
{
    next=execInAppPostRouting;
    if (data_app.count >= data_app.config.in_app.post_routing.length)
    {
        data_app.count = 0;
        execStartServer();
    }
    else
    {
      var in_app_post = require(data_app.config.in_app.post_routing[data_app.count]);
      data_app.count++;
      in_app_post.init(app,data_app,next);
    }
}

var execStartServer = function ()
{
  var server = http.createServer(app);


  /**
   * Event listener for HTTP server "error" event.
   */
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  }
  
  function onClose() {
    data_app.count = 0;
    execPostApp();
  }

  server.listen(data_app.port);
  server.on('error', onError);
  server.on('listening', onListening);
  server.on('close', onClose);
}


var execPostApp = function ()
{
  next=execPostApp;
  if (data_app.count >= data_app.config.post_app.length)
  {
      data_app.count = 0;
      process.exit();
  }
  else
  {
    var post_app = require(data_app.config.post_app[data_app.count]);
    data_app.count++;
    post_app.init(app,data_app,next);
  }
}


execPreApp();


