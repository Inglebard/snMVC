var	fs = require('fs');
var	http = require('http');
var	https = require('https');
var express = require('express');
var	config = require('./config/config.js')();
var	app = express();

/**
 * Normalize a port into a number, string, or false.
 */


var server;
var server_ssl;
var data_app = {};

data_app.root = __dirname;
data_app.server = server;
data_app.server_ssl = server_ssl;
data_app.root = __dirname;
data_app.config = config;
data_app.count = 0;

var execPreApp = function ()
{
  next=execPreApp;
  if (data_app.count >= data_app.config.pre_app.length)
  {
      data_app.count = 0;
      execStartServer();
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
  let next = execInAppPostRouting;
  let router = require('./config/router.js');
  router.init(app,data_app,next);
}

var execInAppPostRouting = function ()
{
    next=execInAppPostRouting;
    if (data_app.count >= data_app.config.in_app.post_routing.length)
    {
        data_app.count = 0;
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
  /**
   * Event listener for HTTP server "error" event.
   */
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var addr = this.address();
    var bind = typeof addr === 'string'
      ? 'Pipe ' + addr
      : 'Port ' + addr.port;

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
    var addr = this.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  }

  //seems to be called once
  function onClose() {
    data_app.count = 0;
    execPostApp();
  }


  if(data_app.config.http)
  {
    data_app.server = http.createServer(app);
  	data_app.server.listen(data_app.config.http.port);
  	data_app.server.on('error', onError);
  	data_app.server.on('listening', onListening);
  	data_app.server.on('close', onClose);

  }
  if(data_app.config.https)
  {

    let options={};
    for(let key in data_app.config.https.options) {
        if(key == 'key' || key == 'cert') {
            options[key] = fs.readFileSync(data_app.config.https.options[key]);
        }
    }

  	data_app.server_ssl = https.createServer(options,app);
  	data_app.server_ssl.listen(data_app.config.https.port);
  	data_app.server_ssl.on('error', onError);
  	data_app.server_ssl.on('listening', onListening);
  	data_app.server_ssl.on('close', onClose);
  }
  execDatabases();
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
