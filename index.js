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
});
