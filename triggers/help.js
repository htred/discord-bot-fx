module.exports = function(api, message){
  var funcs = Object.keys(api.triggerHandler.triggers);
  var cmds = [];
  for(var i=0; i < funcs.length; i++){
    cmds.push({
      name: funcs[i],
      args: api.helper.getFnParamNames(api.triggerHandler.triggers[funcs[i]])
    })
    cmds[i].args.shift();
    cmds[i].args.shift();
  }
  var response = "Here is a list of possible commands:\n";
  for(var i=0; i < cmds.length; i++){
    if(!cmds[i].name.startsWith("_alias_")){
      response += "/" + cmds[i].name + " ";
      if(api.config.aliases[cmds[i].name]){
        response += "(aliases:";
        for(var j=0; j < api.config.aliases[cmds[i].name].length; j++){
          response += " /" + api.config.aliases[cmds[i].name][j];
        }
        response += ") ";
      }
      if(cmds[i].args.length > 0){
        response += "(arguments:";
        for(var j=0; j < cmds[i].args.length; j++){
          response += " " + cmds[i].args[j];
        }
        response += ")";
      }
      response += "\n";
    }
  }
  response += "\nSample command:\n/random 1 10"
  message.channel.send(response);
}