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
  message.reply(" your current stats is as follow: \n Balance: $" + usr[message.author.id]["balance"] + " \n Hours: " + usr[message.author.id]["hour"] + "h \n Degree: " + usr[message.author.id]["degree"] + "\n Question attempted: " + usr[message.author.id]["amtQue"])
}
