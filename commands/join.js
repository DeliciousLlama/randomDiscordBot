module.exports = {
	name: 'join',
  execute(message, args) {
	  join(message.author, message)
	},
}

var table = require("../table")
var usr = table.usr

function join(author, msg){
  if (author.id in usr){
    msg.channel.send(author + " is already part of the workforce.")
    return
  }

  msg.channel.send(author + " joined the workforce! Do `help` for a list of commands!")
  usr[author.id] = {
    balance:0,
    hour:0,
    answering:false,
    a:0,
    b:0,
    c:0,
    inventory:[],
    degree: 'no degree yet. Work some more to earn a degree!',
    degreeLvl : -1,
    amtQue : 0
  }

  table.writeFile(usr)
}
