var table = require("../table")
var usr = table.usr

module.exports = {
	name: 'earn-degree',
  execute(message, args) {
	  thing(message.author, message)
	},
}

var uni_degrees = {
  'a High School Deploma Degree From Troy High' : 4,
  'a Bachlors Degree From MIT' : 4+4,
  'a Masters Degree From MIT' : 4+4+5,
  'a Doctor Degree From MIT' : 4+4+5+6,
  'a Doctorate Degree From MIT' : 4+4+5+6+10
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

  // i is the amount of level upgraded.
  i = usr[author.id]["degreeLvl"]
  prev_i = i
  while (usr[author.id]["hour"] >= Object.values(uni_degrees)[usr[author.id]["degreeLvl"]+1]){
    usr[author.id]["degreeLvl"] ++
    i++
  }
  usr[author.id]["degree"] = Object.keys(uni_degrees)[i]
  if (prev_i != i){
    msg.reply("You did not earn a new degree. Work some more to get a " + Object.keys(uni_degrees)[i])
  } else{
    msg.reply("Congragulations! You earned yourself a " + Object.keys(uni_degrees)[i] + "! Good job!")
  }

  table.writeFile(usr)  
}
