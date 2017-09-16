module.exports = function(api, message){
  var content = api.config.content.uselessweb;
  message.reply(content[Math.floor(Math.random()*content.length)]);
}