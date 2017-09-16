module.exports = {
  token: 'TOKEN HERE',
  connectionRetryTimeout: 30 * 1000, //milliseconds
  triggerChar: '/',
  triggers: __dirname + '/triggers',
  logger: {
    directory: __dirname + '/log',
    loglevel: 'silly'
  },
  aliases: {
    random: ["rnd", "zufall"],
    help: ["hilfe"],
    uselessweb: ["useless", "nutzlos"]
  },
  content: require('./content.json')
}