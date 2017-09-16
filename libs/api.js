var api = function(){
  // init components
  this.config = require("./../config.js");
  this.helper = require("./helper.js")
  this.logger = new (require("./Logger.js"))(this, this.helper.getTimestamp());
};

module.exports = api;