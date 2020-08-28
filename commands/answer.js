module.exports = {
	name: 'answer',
  execute(message, args) {
	  answer(message.author, message, args)
	},
}

var table = require("../table")
var usr = table.usr

function answer(author, msg, value){                                                                                                                                                
  if (!(author.id in usr)){
    msg.reply("you are not in the work force! do `join` to join!")
    return
  }
  c = usr[author.id]["a"]+usr[author.id]["b"]
  if (!value.length){
    msg.reply('You ditched for no reason! Bad!')
    return
  }
  if (String(c) === value[0]){
   usr[author.id]["balance"] += c/2
   msg.reply('Current! You earned $' + c/2)
   usr[author.id]["hour"] ++
  } else {
   msg.reply('Incorrect. The correct answer is ' + c + '. Try again though!')
  }
  usr[author.id]["amtQue"] ++
  usr[author.id]["answering"] = false
  table.writeFile(usr)
}

