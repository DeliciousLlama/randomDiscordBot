var table = require("../table")
var usr = table.usr

module.exports = {
	name: 'stats',

  execute(message, args) { 
    thing(message.author, message, args) 
	},
}

function thing(author, message, args){
  if (!(author.id in usr)){
    message.reply("you are not in the work force! do `join` to join!")
    return
  }
  message.reply("Balance: $" + usr[message.author.id]["balance"] + " | Hours: " + usr[message.author.id]["hour"] + "h | Degree: " + usr[message.author.id]["degree"])
}
