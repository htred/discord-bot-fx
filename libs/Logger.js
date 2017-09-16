var winston = require("winston");
var fs = require("fs");

var Logger = function(api, filename){
  this.api = api;
  this.createLogFolder(api.config.logger.directory);
  winston.level = api.config.logger.loglevel;
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.Console,{"timestamp":true});
  winston.add(winston.transports.File,{ filename: api.config.logger.directory + '/' + filename + '.log' });
  api.log = this.log;
}

Logger.prototype.createLogFolder = function(path){
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
}

Logger.prototype.log = function(message, level){
  winston.log(level || 'info', message);
}

module.exports = Logger;