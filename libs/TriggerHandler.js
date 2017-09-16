var TriggerHandler = function(api){
  this.api = api;
  this.initTriggers();
}

TriggerHandler.prototype.trigger = function(message){
  var api = this.api;
  var msgContent = message.content.toLowerCase()
  var cmd = msgContent.substr(1);  
  var trigger = api.helper.nthWord(cmd, 1);
  var func = this.triggers[trigger];
  if(!func) func = this.triggers["_alias_" + trigger];
  if(func){
    var guild = message.channel.guild;
    api.log(message.author.username + '(' + message.author.id + ') on ' + guild.name + '(' + guild.id + ') triggered "' + trigger + '"');
    var args = cmd.replace(trigger, "").trim();
    if(args === ""){
      args = [];
    }
    else{
      args = args.split(api.config.split);
    }
    args.unshift(api, message);
    func.apply(this, args);
   }
}

TriggerHandler.prototype.initTriggers = function(){
  var api = this.api;
  this.triggers ={};
  var files = api.helper.listFiles(api.config.triggers);
  for(var i=0; i < files.length; i++){
    var trigger = files[i].split(".")[0];
    var func = require(api.config.triggers + "/" + files[i]);
    this.triggers[trigger] = func;
    if(api.config.aliases[trigger]){
      for(var j=0; j < api.config.aliases[trigger].length; j++){
        this.triggers["_alias_" + api.config.aliases[trigger][j]] = func;
      }
    }
  }
  var alltriggers = Object.keys(this.triggers);
  var triggers = alltriggers.filter(function (item){
    return item.indexOf("_alias_") !== 0;
  });
  var aliases = alltriggers.filter(function (item){
    return item.indexOf("_alias_") === 0;
  });
  api.log("triggers added: " + JSON.stringify(triggers));
  api.log("aliases added: " + JSON.stringify(aliases));  
}

module.exports = TriggerHandler;