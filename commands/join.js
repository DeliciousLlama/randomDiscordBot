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
    hour:1,
    answering:false,
    a:Math.floor(Math.random()*100),
    b:Math.floor(Math.random()*100),
    inventory:[],
    degree: 'no degree yet. Work some more to earn a degree!',
    degreeLvl : -1
    }

  table.writeFile(usr)
}
