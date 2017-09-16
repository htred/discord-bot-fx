var fs = require("fs");

var helper ={};

helper.getTimestamp = function(){
  var date = new Date();
  return date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + 'T' + // year, month, day
         ('0' + (date.getHours()+1)).slice(-2) + '-' + ('0' + (date.getMinutes()+1)).slice(-2) + '-' + ('0' + (date.getSeconds()+1)).slice(-2) + '.' + // hour, minute, second
         ('0' + (date.getMilliseconds()+2)).slice(-3) + 'Z'; // millisecond
}

helper.nthWord = function(str, n){
  var m = str.match(new RegExp('^(?:\\w+\\W+){' + --n + '}(\\w+)'));
  return m && m[1];
};

helper.removeFromArray = function(arr){
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length){
    what = a[--L];
    while ((ax= arr.indexOf(what)) !== -1){
      arr.splice(ax, 1);
    }
  }
  return arr;
}

helper.getFnParamNames = function(fn){
  var fstr = fn.toString();
  return fstr.match(/\(.*?\)/)[0].replace(/[()]/gi,'').replace(/\s/gi,'').split(',');
}

helper.listFiles = function(dir){
  return fs.readdirSync(dir);
};

module.exports = helper;