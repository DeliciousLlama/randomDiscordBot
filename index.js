require('dotenv').config();
const fs = require('fs');

const Discord = require('discord.js');
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

/*
var usraw = fs.readFileSync('usrs.json')
var usr = JSON.parse(usraw)
*/

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

function join(author, msg){
  if (author.id in usr){
    msg.channel.send(author + " is already part of the workforce.")
    return
  }

  msg.channel.send(author + " joined the workforce.")

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

  writeFile(usr)
}

/*
function writeFile(usr){
  data = JSON.stringify(usr)
  fs.writeFileSync('usrs.json', data)
}
*/

function cancel(author, msg){
  msg.reply('cancelled action')
  usr[msg.author.id]["answering"] = false
}

function answer(author, msg, value){
  c = usr[author.id]["a"]+usr[author.id]["b"]
  
  if (!value.length){
    msg.reply('You ditched for no reason! Bad!')
    return
  }

  if (String(c) === value[0]){
    usr[author.id]["balance"] += c/2
    msg.reply('Current! You earned $' + c/2)
  } else {
    msg.reply('Incorrect. The correct answer is ' + c + '. But at least you tried')
  }
  usr[author.id]["hour"] ++
  usr[author.id]["answering"] = false

  writeFile(usr)
}

function init_work(author, msg){
  usr[author.id]["a"] = Math.floor(Math.random()*100)
  usr[author.id]["b"] = Math.floor(Math.random()*100)
  usr[author.id]["answering"] = true
  msg.reply("Work hour " + usr[author.id]["hour"] + ": solve " + usr[author.id]["a"]  + "+" + usr[author.id]["b"]  + "; In order to answer, type `_answer [your-answer]` (without the brackets) to answer, and `_cancel` to cancel this action")
}

function earn_degree (author, msg){
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
  
  writeFile(usr)
}

function stats (author, msg){
  msg.reply("Balance: $" + usr[msg.author.id]["balance"] + " | Hours: " + usr[msg.author.id]["hour"] + "h | Degree: " + usr[msg.author.id]["degree"])
}


function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return bot.users.cache.get(mention);
	}
}

function checkRecipient(mention, author, msg){
  if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		} else {
      msg.reply("Sorry, but I don't recognize that user. Check that you have inputted a user ping.")
      return -1
    }
  } else { 
    msg.reply("Sorry, but I don't recognize that user. Check that you have inputted a correct ping.")
    return -1
  }

  if (!(mention in usr)){
    msg.channel.send(author + "Sorry, but that user is not part of the workforce yet!")
    return -1
  }
  
  return 1
}


function paypal(author, msg, args){

  if (args.length != 2){
    //if the arguments are invalid
    msg.reply("Sorry, I didn't understand. Please type in the following format: `_paypal [@reciever] [amount]`, without the quotes.")
    return

  }

  //check if mention if proper
  recipient = args[0]
  if (checkRecipient(recipient, author, msg) == -1){
    return
  }

  payment = args[1]

  if (payment <= 0) {
    // if the amount is 0 or negative
    msg.reply("Sorry, your amount cannot be 0 or a negative number. Please try again.")
    return

  } else if (payment > usr[author.id]["balance"]){
    // if the amount they are trying to pay exceeds their balance
    req = payment - usr[author.id]["balance"]
    msg.reply("Sorry, you do not have enough money to paypal the person you are trying to pay. You need $" + req + " more.")
  }

  recipient = recipient.slice(3,-1)

  // after all that's done, we actually do the subtracting and math
  usr[recipient]["balance"] += Number(payment)
  usr[author.id]["balance"] -= Number(payment)

  msg.reply("Success! $" + payment + " is successfully transferred to " + bot.users.get(recipient).tag + "!")
}

var prefix = '_'

bot.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return
  const args = msg.content.slice(prefix.length).split(' ')
  const command = args.shift().toLowerCase()

  console.log(command, args)
 
  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }

  /*
  if (command === 'join'){ //join when they want to
    join(msg.author, msg)
  } else if (!(msg.author.id in usr)){ //if they aren't joined, tell them
    msg.reply("You have not joined the work force yet. Type '_join' to join the workforce")
    return
  }

  // ----- main playground ----- 

  if (command === 'cancel') { // if they are currently working
    cancel (msg.author, msg)
  } else if (command === 'answer') {
    answer (msg.author, msg, args)
  }

  if (command === 'stats'){ //simply output their current situation
    stats(msg.author, msg)
  }

  if (command === 'work') { // if they are working
    init_work(msg.author, msg)
  }

  if (command === 'earn-degree'){
    earn_degree(msg.author, msg)
  }

  if (command === 'paypal'){
    paypal(msg.author, msg, args)
  }
  */
});
