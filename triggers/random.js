module.exports = function(api, message, minimum, maximum){
  min = Math.ceil(parseInt(minimum) || 1);
  max = Math.floor(parseInt(maximum) || 100);
  var rnd = Math.floor(Math.random() * (max - min + 1)) + min;
  message.reply("your random number is " + rnd);
}