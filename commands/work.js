module.exports = {
	name: 'work',
  execute(message, args) {
	  thing(message.author, message)
	},
}

var table = require("../table")
var usr = table.usr

function thing(author, msg){
  usr[author.id]["a"] = Math.floor(Math.random()*100)
  usr[author.id]["b"] = Math.floor(Math.random()*100)
  usr[author.id]["answering"] = true        
  msg.reply("Work hour " + usr[author.id]["hour"] + ": solve " + usr[author.id]["a"]  + "+" + usr[author.id]["b"]  + "; In order to answer, type `_answer [your-answer]` (without the     brackets) to answer, and `_cancel` to cancel this action")
  table.writeFile(usr)
}
