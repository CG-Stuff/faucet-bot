const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "dice",
  description: "Gamble your money and earn 2x from your bet",
  aliases: ["d"],
  execute(message, args){
if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply(
        "**This Fun command cant be used by normal users :)**"
      );
    }
    var array = [0, 1, 2, 3, 4, 5, 6];
   /* var doge = "<:doge:783589894152519720>"
      var rdd = "<a:rdd:783590849514307595>"
      var btc = "<:btc:783602213989384192>"
   */
    var random = [Math.floor(array.length * Math.random())];
    var amount = args[0];
    const currencies = ["usd"]
    var currency = args[1];
    const check_currency = db.fetch(`${currency.toLowerCase()}.${message.author.id}`) || 0;
    var author = db.fetch(`${currency.toLowerCase()}.${message.author.id}`) || 0;
 if(!currency){
   return message.reply("**Choose your currency you want to bet with**")
   }
   /*if(check_currency == "0"){
     message.channel.send("Invalid Currency")
     
   }*/
    if (author < amount) {
      return message.reply(
        "**The amount your betting on is more than your balance!**"
      );
    }
    if (!amount) {
      return message.reply("**You must type in a number!**");
    }
    else if(!currencies.includes(currency.toLowerCase())){
      message.reply("The currency doesnt match with out Database");
    }
    else if(currencies.includes(currency.toLowerCase())){
     if (author >= amount){
     if (random < 3) {
     db.add(`${currency.toLowerCase()}.${message.author.id}`, amount);
     var total = Math.floor(author + amount);
    const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.username} rolled a dice and get number ${random}, and won!`,
          message.author.avatarURL
        )
        .setDescription(`Win`)
        .addFields(
          {name:"Profit:" , value: `${amount}`},
        {name:"Current Balance:", value: `${total}`}
        )
        .setColor("GREEN")
        .setFooter(process.env.F_CREDIT
          /*"GameB21",
          "https://cdn.discordapp.com/avatars/646725492417757187/8ccabeb93dcc50bb1d83a05caf704462.png?size=2048" */
        );
      message.channel.send(embed); 
    }
    if (random > 4) {
      db.subtract(`${currency}.${message.author.id}`, amount);
      const total = Math.floor(author - amount);
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.username} rolled a dice and get number ${random}, and lost!`,
          message.author.avatarURL
        )
        .setDescription(`Lost`)
        .addFields(
          {name:"Loss:" , value: `${amount}`},
        {name: "Current Balance", value: `${total}`}
    )
        .setColor("RED")
        .setFooter(process.env.F_CREDIT
          /*"GameB21",
          "https://cdn.discordapp.com/avatars/646725492417757187/8ccabeb93dcc50bb1d83a05caf704462.png?size=2048" */
        );
      message.channel.send(embed);
    }
    }
    }
  }
  
}