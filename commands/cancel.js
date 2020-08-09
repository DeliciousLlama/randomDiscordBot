var table = require("../table")
var usr = table.usr

module.exports = {
	name: 'cancel',
	description: 'cancel',
  execute(message, args) {
		cancel(message.author, message)
	},
}
function cancel(author, msg){
  msg.reply('cancelled action')
  usr[msg.author.id]["answering"] = false
  table.writeFile(usr)
}
