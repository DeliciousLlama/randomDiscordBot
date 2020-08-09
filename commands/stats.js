var table = require("../table")
var usr = table.usr

module.exports = {
	name: 'stats',

  execute(message, args) { 
	  message.reply("Balance: $" + usr[message.author.id]["balance"] + " | Hours: " + usr[message.author.id]["hour"] + "h | Degree: " + usr[message.author.id]["degree"])
	},
}
