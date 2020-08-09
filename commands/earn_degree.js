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


function thing(author, msg){
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
