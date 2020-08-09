var table = require("../table")
var usr = table.usr

module.exports = {
	name: 'earn-degree',
  execute(message, args) {
	  thing(message.author, message)
	},
}

var uni_degrees = {
  'a High School Deploma Degree' : 3,
  'a Bachlors Degree From MIT' : 8,
  'a Masters Degree From MIT' : 15,
  'a Doctor Degree From MIT' : 30,
  'a Doctrine Degree From MIT' : 50
}

var dollar_store = {
  'A Subway Sandwich' : 10,
  'A 10 Dollar Bill' : 20,
  'An Iphone 11' : 1099,
  'A Lighter' : 3,
  'A Laser Pointer' : 1,
  'Windows 10 Pro': 199,
  'Adobe Photoshop Cracked' : 10
}

function thing(author, msg){
  if (!(author.id in usr)){
    msg.reply("you are not in the work force! do `join` to join!")
    return
  }

  if (usr[author.id]["degreeLvl"] == 4){
    msg.reply("You have a literal doctrine degree what do you want? You should be teaching not learning")
    return
  }
  i=-1
  while (usr[author.id]["hour"] >= Object.values(uni_degrees)[usr[author.id]["degreeLvl"]+1]){
    usr[author.id]["degreeLvl"] ++
    i++
  }
  usr[author.id]["degree"] = (i >= 0) ? Object.keys(uni_degrees)[i] : usr[author.id]["degree"]
  msg.reply("Congrats! Your are currently have " + usr[author.id]["degree"])

  table.writeFile(usr)  
}
