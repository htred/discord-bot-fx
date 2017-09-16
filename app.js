var Discord = require("discord.js");
var client = new Discord.Client();
var api = new (require("./libs/api.js"));
api.triggerHandler = new (require("./libs/TriggerHandler.js"))(api);

client.on("message", message => {
  var selection = false;
  if(message.content.charAt(0) === api.config.triggerChar){
    api.triggerHandler.trigger(message);
  }
});

api.connect = function(){
  api.log("connecting to discord server");
  client.login(api.config.token)
    .then(function(){
      api.log("connected to discord");
    })
    .catch(function(err){
      api.log("error: " + err.message, "error");
      api.log("could not connect to discord, retrying in 30 seconds...", "error");
      setTimeout(api.connect, api.config.connectionRetryTimeout);
    });
}

api.log("starting server");
api.connect();