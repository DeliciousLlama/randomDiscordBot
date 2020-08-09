var table = require("../table")
var usr = table.usr

module.exports = {
	name: 'paypal',
  execute(message, args) {
	  thing(message.author, message, args)
	},
}

function thing(author, msg, args){
  if (!(author.id in usr)){
    msg.reply("you are not in the work force! do `join` to join!")
    return
  }

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

  table.writeFile(usr)

  msg.reply("Success! $" + payment + " is successfully transferred to " + msg.mentions.users.first().tag + "!")
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
