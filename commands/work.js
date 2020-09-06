module.exports = {
	name: 'work',
  execute(message, args) {
	  thing(message.author, message)
	},
}

var table = require("../table")
var usr = table.usr

function thing(author, msg){
  if (!(author.id in usr)){
    msg.reply("you are not in the work force! do `join` to join!")
    return
  }

  switch (usr[author.id]["degreeLvl"]) {
    case -1:
      usr[author.id]["a"] = Math.floor(Math.random()*100)
      usr[author.id]["b"] = Math.floor(Math.random()*100)    
      usr[author.id]["c"] = usr[author.id]["a"]+usr[author.id]["b"]

      usr[author.id]["answering"] = true        
      msg.reply("Work hour " + String(1 + Number(usr[author.id]["hour"])) + ": solve " + usr[author.id]["a"]  + "+" + usr[author.id]["b"]  + "; In order to answer, type `_answer [your-answer]` (without the     brackets) to answer, and `_cancel` to cancel this action")
      table.writeFile(usr)

      break
    case 0:
      usr[author.id]["a"] = Math.floor(Math.random()*1000)
      usr[author.id]["b"] = Math.floor(Math.random()*1000)
      if (Math.round(Math.random) == 0){
        usr[author.id]["c"] = usr[author.id]["a"]+usr[author.id]["b"]
        console.log(1)
        usr[author.id]["answering"] = true        
        msg.reply("Work hour " + String(1 + Number(usr[author.id]["hour"])) + ": solve " + usr[author.id]["a"]  + "+" + usr[author.id]["b"]  + "; In order to answer, type `_answer [your-answer]` (without the     brackets) to answer, and `_cancel` to cancel this action")
        table.writeFile(usr)
      } else {
        usr[author.id]["c"] = usr[author.id]["a"]-usr[author.id]["b"]
        usr[author.id]["answering"] = true        
        msg.reply("Work hour " + String(1 + Number(usr[author.id]["hour"])) + ": solve " + usr[author.id]["a"]  + "-" + usr[author.id]["b"]  + "; In order to answer, type `_answer [your-answer]` (without the     brackets) to answer, and `_cancel` to cancel this action")
        table.writeFile(usr)
      }
      break
    case 1:
      usr[author.id]["a"] = Math.floor(Math.random()*10)
      usr[author.id]["b"] = Math.floor(Math.random()*10)    
      usr[author.id]["c"] = usr[author.id]["a"]*usr[author.id]["b"]

      usr[author.id]["answering"] = true        
      msg.reply("Work hour " + String(1 + Number(usr[author.id]["hour"])) + ": solve " + usr[author.id]["a"]  + "×" + usr[author.id]["b"]  + "; In order to answer, type `_answer [your-answer]` (without the     brackets) to answer, and `_cancel` to cancel this action")
      table.writeFile(usr)
      break
    case 2:
      usr[author.id]["a"] = Math.floor(Math.random()*100)
      usr[author.id]["b"] = Math.floor(Math.random()*100)    
      usr[author.id]["c"] = usr[author.id]["a"]*usr[author.id]["b"]

      usr[author.id]["answering"] = true        
      msg.reply("Work hour " + String(1 + Number(usr[author.id]["hour"])) + ": solve " + usr[author.id]["a"]  + "×" + usr[author.id]["b"]  + "; In order to answer, type `_answer [your-answer]` (without the     brackets) to answer, and `_cancel` to cancel this action")
      table.writeFile(usr)
      break
    case 3:
      usr[author.id]["a"] = Math.floor(Math.random()*1000)
      usr[author.id]["b"] = Math.floor(Math.random()*1000)    
      usr[author.id]["c"] = usr[author.id]["a"]*usr[author.id]["b"]

      usr[author.id]["answering"] = true        
      msg.reply("Work hour " + String(1 + Number(usr[author.id]["hour"])) + ": solve " + usr[author.id]["a"]  + "×" + usr[author.id]["b"]  + "; In order to answer, type `_answer [your-answer]` (without the     brackets) to answer, and `_cancel` to cancel this action")
      table.writeFile(usr)
      break
    case 4:
      usr[author.id]["a"] = Math.floor(Math.random()*1000)
      usr[author.id]["b"] = Math.floor(Math.random()*1000) 
      var x = Math.round(Math.random)*2
      if (x == 2){
        usr[author.id]["c"] = usr[author.id]["a"]+usr[author.id]["b"]

        usr[author.id]["answering"] = true        
        msg.reply("Work hour " + String(1 + Number(usr[author.id]["hour"])) + ": solve " + usr[author.id]["a"]  + "+" + usr[author.id]["b"]  + "; In order to answer, type `_answer [your-answer]` (without the     brackets) to answer, and `_cancel` to cancel this action")
        table.writeFile(usr)
      } else if (x == 1) {
        usr[author.id]["c"] = usr[author.id]["a"]-usr[author.id]["b"]

        usr[author.id]["answering"] = true        
        msg.reply("Work hour " + String(1 + Number(usr[author.id]["hour"])) + ": solve " + usr[author.id]["a"]  + "-" + usr[author.id]["b"]  + "; In order to answer, type `_answer [your-answer]` (without the     brackets) to answer, and `_cancel` to cancel this action")
        table.writeFile(usr)
      } else {
        usr[author.id]["c"] = usr[author.id]["a"]*usr[author.id]["b"]

        usr[author.id]["answering"] = true        
        msg.reply("Work hour " + String(1 + Number(usr[author.id]["hour"])) + ": solve " + usr[author.id]["a"]  + "×" + usr[author.id]["b"]  + "; In order to answer, type `_answer [your-answer]` (without the     brackets) to answer, and `_cancel` to cancel this action")
        table.writeFile(usr)
      }
      break
  }
}
